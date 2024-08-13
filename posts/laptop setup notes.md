---
title: "setting up my laptop"
description: "notes on how i setup my laptop wih Fedora Workstation Linux"
tags:
 - tech
 - notes to self
created: 2024-07-04T18:56:00Z
---
what's this? a tech post on this tech blog?

# preface
## why?

recently my laptop started running dangerously full on disk usage (who'd've thunk 150gb was not enough for a daily driven linux install ¯\\\_(ツ)_/¯), so i decided that rather than trudge through my drive and clean out junk id just back up my entire `\` drive onto an external hard drive, clean reinstall and upgrade Fedora Workstation 40. 

i also took this opportunity to finally completely ditch gnome for good, and complete my switch to KDE Plasma with an upgrade to Plasma 6! i don't know why i chose to stick with gnome when i switched to fedora 2 years ago, i knew even back then how backwards the gnome devs were [^1]. 

after games like Factorio launched with just a plain, decoration-less window for the hundredth time, and the 20 extensions that i had to install just to get my workflow down broke after the most minor of gnome updates[^2] i had enough, `dnf groupinstall`ed KDE5 and customized to my hearts content without having to install a single extra utility. [^3]

so, this post's basically a big note to self for me to follow while setting up my system again. some of the stuff's obvious, like a big list of packages for me to install, and some's the most obscure stuff i had to hunt through forum posts to find answers to in typical linux fashion. hopefully some of this is useful to someone else.

## download
first, get Fedora KDE 40. i prefer to download the torrent, which is available [here](https://torrent.fedoraproject.org/). the torrent should also come with a `CHECKSUM file, which you should 100% be using to ensure that your download is valid. (checksums are also available [here](https://dl.fedoraproject.org/pub/fedora/linux/releases/test/40_Beta/) too.)

first, download the fedora GPG keys.
```shell
$ curl -O https://fedoraproject.org/fedora.gpg
```
verify that the keys are correct by listing them
```shell
$ gpg --with-fingerprint --show-keys --keyid-format long fedora.gpg
```
and verify these against the keys given on the [Fedora website](https://fedoraproject.org/security).

then use the verified keys to verify the checksum
```shell
$ gpgv --keyring ./fedora.gpg Fedora-Spins-40-1.14-x86_64-CHECKSUM
```
then finally use the verified checksum to verify the iso
```shell
$ sha256sum -c Fedora-Spins-40-1.14-x86_64-CHECKSUM
```
## install media
i use a 32gb usb drive and [ventoy](https://www.ventoy.net/en/index.html) for this, which means writing the iso to the drive is as simple as copying it to the drive and selecting it in the list when ventoy boots up.

i don't use a separate home partition, but i might this time because i no longer have storage issues given that i'm increasing my fedora install to 500 GB total.

# the basics
## setup
change the hostname, if i didn't set it in the installer:
`hostnamectl set-hostname brahma`

install prerequisites for the next couple steps
```shell
$ sudo dnf install git python3
```
also, enable rpm fusion repos
```shell
$ sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm \
 https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
```
and flathub
```shell
$ flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo
```
## displaylink
displaylink is still not fully supported in linux, and worse still, i've got a newer usb 3.0 dock where the drivers aren't installed by default. this wouldn't be a problem except synaptics happily only make the new displaylink driver available for ubuntu, and leave other distros to "the community" to unpack and repackage.

thankfully, there's a [group](https://github.com/displaylink-rpm/displaylink-rpm) that packages the driver as an rpm, and they have a version for fedora 40!
even better, someone's made this available as a [copr](https://copr.fedorainfracloud.org/coprs/crashdummy/Displaylink/), so installing the drivers is as easy as:
```shell
$ sudo dnf copr enable crashdummy/Displaylink
$ sudo dnf install displaylink
```

when testing this with a live install, i did find that the evdi kernel module used by the driver would just not build itself, possibly because the live environment thought it was running on a different kernel version, so i ended up having to manually build and load the drivers myself:
```shell
$ git clone https://github.com/displaylink/evdi
$ cd evdi
$ cp module/* /usr/src/evdi-1.14.5/
$ sudo dnf install dkms kernel-devel-$(uname -r)
$ sudo dkms build -m evdi -v 1.14.5 --force
$ sudo dkms install -m evdi -v 1.14.5
```
that got my screens to wake up on the live session.
### building the evdi drivers for a kernel update
normally dkms just works and rebuilds everything every kernel upgrade, but sometimes it needs to be jolted back to life.
```shell
$ # first, make sure that the requirements are installed:
$ sudo dnf install python3 python3-pybind11 libdrm libdrm-devel
$ # also install the kernel headers for the current version:
$ sudo dnf install kernel-devel-$(uname -r)
$ # then clone the kernel module
$ git clone https://github.com/displaylink/evdi
$ cd evdi
$ # and then you should be able to build and install the drivers again:
$ make
$ sudo make install
```

from then on, every kernel update, you can run `make` and `sudo make install`, and it should just work.[^4]


## nvidia drivers
fedora already comes installed with nouveau drivers, but some programs i use need cuda support, as well as games run better with proprietary drivers.
```shell
$ sudo dnf install akmod-nvidia xorg-x11-drv-nvidia-cuda
```
wait a couple of minutes before rebooting, as the module is getting built in the background.
check that it's done with `modinfo -F version nvidia` or `modprobe nvidia` returning 0.

## dotfiles
i use the style of dotfiles described in [this atlassian article](https://www.atlassian.com/git/tutorials/dotfiles). it involves a bare git repo in a folder and git commands that are run against it to add config files.
to setup:
```shell
$ git clone --bare https://github.com/appcreatorguy/dotfiles
$ # first, backup any existing dotfiles (.bashrc, etc.)
$ mkdir -p .config-backup
$ config checkout 2>&1 | egrep "\s+\." | awk {'print $1'} | xargs -I{} mv {} .config-backup/{}
```
then temporarily define a local bash function for the *config* command, which is just a wrapper around git with args to specify our dotfiles folder:
```shell
$ function config {
   /usr/bin/git --git-dir=$HOME/.cfg/ --work-tree=$HOME $@
}
```
and checkout the repo with `config checkout`. to prevent an explosion when you run `config status` remember to set this flag in the repo's config :`config config status.showUntrackedFiles no`.

## tools
### ssh
fedora should come with ssh by default. i copy my ssh key over from my backup so that i don't have to re-enroll keys on all my devices.
### shell
i use zsh as my shell, so install it and change the default shell.
```shell
$ sudo dnf install zsh
$ chsh -s $(which zsh)
```
### python
install pip for python packages:
```shell
$ sudo dnf install python3-pip
```
### deno
install deno (which powers this blog!):
```shell
$ curl -fsSL https://deno.land/install.sh | sh
```
### tailscale
install tailscale so i can access my homelab from anywhere:
```shell
$ curl -fsSL https://tailscale.com/install.sh | sh
$ tailscale up --operator=$USER # set the operator to the current user, will be helpful further on
```
### syncthing
i use [syncthing](https://syncthing.net/) to synchronize files between all my devices (including my jailbroken kindle!) and it just works; it's honestly epic.
```shell
$ sudo dnf install syncthing
```
i want it to carry over my settings from the previous install, so i'll copy over the folder `~/.config/syncthing` from my backup.
### terminal
i use the kitty terminal
```shell
$ sudo dnf install kitty
```
### ides
these days i've fallen back into using vscode
```shell
$ sudo dnf install code
```
settings sync is on, so signing in should pull my config for that
i also use neovim, and a version manager for it called [bob](https://github.com/MordechaiHadad/bob)
```shell
$ sudo dnf install cargo
$ cargo install bob-nvim
$ bob use stable # should be v0.10.0 at time of writing
```
for my nvim config, i use [astronvim](https://astronvim.com/), however i haven't had the time to update my config to v4, so that'll have to be done *later*.

## other things
### spotify
first install:
```shell
$ flatpak install flathub com.spotify.Client
```
then install [spicetify](https://spicetify.app/docs/getting-started) for extensions and theming
```shell
$ curl -fsSL https://raw.githubusercontent.com/spicetify/cli/main/install.sh | sh
$ curl -fsSL https://raw.githubusercontent.com/spicetify/marketplace/main/resources/install.sh | sh # to install spicetify marketplace as well
```
nearly all my extensions come from the spicetify marketplace, as well as some of my custom snippets, so i'll be sure to import them from my backup.

### whatsapp
there's a good flatpak electron wrapper around whatsapp web that i use on linux:
```shell
$ flatpak install flathub io.github.mimbrero.WhatsAppDesktop
```

### tailscale gui
KTailctl seems to work well with KDE on my other laptop
```shell
$ flatpak install flathub org.fkoehler.KTailctl
```

### discord
discord's available in the rpm fusion repos
```shell
$ sudo dnf install discord
```
i also like to use [vencord](https://vencord.dev) to theme discord
```shell
$ sh -c "$(curl -sS https://raw.githubusercontent.com/Vendicated/VencordInstaller/main/install.sh)"
```
and as screen sharing is terrible on wayland, i use [vesktop](https://github.com/Vencord/Vesktop) specifically for that; it's an electron wrapper around the web ui of discord.

[^1]: *how are [no server side decorations](https://gitlab.gnome.org/GNOME/mutter/-/issues/217) treating you, gnome users?*

[^2]: *because **in their infinite wisdom** they deprecated a perfectly useful extension format too soon*

[^3]: *not true, i had to install Kvantum, but this let my DE look like windows 7, so checkmate liberals*

[^4]: *thanks to the comments on [this](https://new.reddit.com/r/Fedora/comments/yxkm3w/fedora_37_anybody_know_how_to_get_displaylink_to/?) obscure reddit post for helping me figure this out*
