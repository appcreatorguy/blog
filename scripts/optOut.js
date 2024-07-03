globalThis.onload = function () {
    const a = document.getElementById("optOut");

    if (localStorage.getItem("umami.disabled") === "1") {
        a.innerText = "opt in";
    } else {
        a.innerText = "opt out";
    }

    a.onclick = function () {
      if (localStorage.getItem("umami.disabled") === "1") {
        localStorage.removeItem("umami.disabled");
        console.log("umami enabled!");
        a.innerText = "opt out";
      } else {
        localStorage.setItem("umami.disabled", 1);
        console.log("umami disabled!");
        a.innerText = "opt in";
      }
    };
};