---
title: "setting up my laptop"
description: "notes on how i setup my laptop wih Fedora Workstation Linux"
tags:
 - tech
 - notes to self
created: 2024-07-04T18:56:00Z
draft: true
---
what's this? a tech post on this tech blog?

recently my laptop started running dangerously full on disk usage (who'd've thunk 150gb was not enough for a daily driven linux install ¯\\\_(ツ)_/¯), so i decided that rather than trudge through my drive and clean out junk id just back up my entire `\` drive onto an external hard drive, clean reinstall and upgrade Fedora Workstation 40. 

i also took this opportunity to finally completely ditch gnome for good, and complete my switch to KDE Plasma with an upgrade to Plasma 6! i don't know why i chose to stick with gnome when i switched to fedora 2 years ago, i knew even back then how backwards the gnome devs were [^1]. 

after games like Factorio launched with just a plain, decoration-less window for the hundredth time, and the 20 extensions that i had to install just to get my workflow down broke after the most minor of gnome updates[^2] i had enough, `dnf groupinstall`ed KDE5 and customized to my hearts content without having to install a single extra utility. [^3]

so, this post's basically a big note to self for me to follow while setting up my system again. some of the stuff's obvious, like a big list of packages for me to install, and some's the most obscure stuff i had to hunt through forum posts to find answers to in typical linux fashion. hopefully some of this is useful to someone else.

# preface
## download
first, get Fedora KDE 40. i prefer to download the torrent, which is available [here](https://torrent.fedoraproject.org/). the torrent should also come with a `CHECKSUM file, which you should 100% be using to ensure that your download is valid. (checksums are also available [here](https://dl.fedoraproject.org/pub/fedora/linux/releases/test/40_Beta/) too.)

first, download the fedora gpg keys.
```shell
curl -O https://fedoraproject.org/fedora.gpg
```
verify that the keys are correct by listing them
```shell
gpg --with-fingerprint --show-keys --keyid-format long fedora.gpg
```
and verify these against the keys given on the [Fedora website](https://fedoraproject.org/security).

then use the verified keys to verify the checksum
```shell
gpgv --keyring ./fedora.gpg Fedora-Spins-40-1.14-x86_64-CHECKSUM
```
then finally use the verified checksum to verify the iso
```shell
sha256sum -c Fedora-Spins-40-1.14-x86_64-CHECKSUM
```
## install media
at last, you can write the verified iso to a drive to boot off of. 
i use a 32gb usb drive and [ventoy](https://www.ventoy.net/en/index.html) for this, which means writing the iso to the drive is as simple as copying it to the drive and selecting it in the list when ventoy boots up.

i stick to the default partition settings mostly, with



[^1]: *how are [no server side decorations](https://gitlab.gnome.org/GNOME/mutter/-/issues/217) treating you, gnome users?*

[^2]: *because **in their infinite wisdom** they deprecated a perfectly useful extension format too soon*

[^3]: *not true, i had to install Kvantum, but this let my DE look like windows 7, so checkmate liberals*