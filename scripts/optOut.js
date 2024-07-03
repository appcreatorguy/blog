globalThis.onload = function () {
    const a = document.getElementById("optOut");

    a.onclick = function () {
      if (localStorage.getItem("umami.disabled") === "1") {
        localStorage.removeItem("umami.disabled");
        console.log("umami enabled!");
      } else {
        localStorage.setItem("umami.disabled", 1);
        console.log("umami disabled!");
      }
    };
};