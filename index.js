
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./service-worker.js")
    .then((registration) => {

      // 請求推送權限
      if (Notification.permission !== "granted") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            // 在權限獲取後，即可開始定時推送通知
            navigator.serviceWorker.getRegistration().then((registration) => {
              const options = {
                body: "測試測試22",
              };
              registration.showNotification("Notification Title", options);
            });
            setInterval(displayNotification, 10000);
          }
        });
      } else {
        // 如果權限已經被授予，即可開始定時推送通知
        setInterval(displayNotification, 10000);
      }
    })
    .catch((error) => {
      console.error("服務註冊錯誤:", error);
    });
}

// 定義推送通知的函數
function displayNotification() {

  if (Notification.permission === "granted") {

    navigator.serviceWorker
      .getRegistration()
      .then((registration) => {
        console.log(77779, registration);

        if (registration) {

          const options = {
            body: "該接小孩囉", // 修改通知内容
            vibrate: [200, 100, 200], // 添加震动效果
          };

          registration
            .showNotification("Notification Title", options)
            .then(() => {
            })
            .catch((error) => {
              console.error("通知顯示錯誤:", error); // 添加这行以在控制台中记录通知显示错误的信息
            });
        } else {
        }
      })
      .catch((err) => {
        console.error("获取 registration 时发生错误:", err);
      });
  } else {
  }
}

//----鼠標圖示---------------------------------------------------------------//
const cursor = document.querySelector(".cursor");
const a = document.querySelectorAll(".a");
const aLinks = document.querySelectorAll("a");

const moveCursor = (e) => {
  const mouseY = e.clientY;
  const mouseX = e.clientX;
  cursor.style.transform = `translate3d(${mouseX - 60}px, ${mouseY - 60}px, 0)`;
};

window.addEventListener("mousemove", moveCursor);

aLinks.forEach((item) => {
  item.addEventListener("mouseover", (e) => {
    const mouseY = e.clientY;
    const mouseX = e.clientX;
    cursor.src = "assest/svg/6265a454da432257599722a1_cursor-hand.svg";
    // cursor.style.transform = `translate3d(${mouseX - 60}px, ${mouseY - 75}px, 0)`;
  });
  item.addEventListener("mouseout", () => {
    cursor.src = "assest/svg/6265a2f373ec362f1b7911c9_cursor-arrow.svg";
  });
});

a.forEach((item) => {
  item.addEventListener("mouseover", (e) => {
    const mouseY = e.clientY;
    const mouseX = e.clientX;
    cursor.src = "assest/svg/6265a454da432257599722a1_cursor-hand.svg";
  });
  item.addEventListener("mouseout", () => {
    cursor.src = "assest/svg/6265a2f373ec362f1b7911c9_cursor-arrow.svg";
  });
});

//----nav效果----------------------------------------------------------------//
let prevScroll = window.pageYOffset;
const nav = document.querySelector("nav");

window.onscroll = function () {
  let currentScroll = window.pageYOffset;
  if (prevScroll > currentScroll) {
    //判斷滑動方向//
    document.querySelector("nav").style.top = "0";
  } else {
    document.querySelector("nav").style.top = `-${nav.clientHeight}px`;
  }
  prevScroll = currentScroll;
};

//----inner摺疊效果-------------------------------------------------------------//
const pickers = document.querySelectorAll(".innerPicker");
const outer = document.querySelectorAll(".outer");
outer.forEach((item, index) => {
  item.addEventListener("click", () => {
    pickers[index].classList.toggle("pickup");
    pickers[index].classList.toggle("pickdown");
    const inner = item.parentNode.children[1];
    inner.classList.toggle("foldup");
    inner.classList.toggle("folddown");
  });
});

//----card翻面效果---------------------------------------------------------------//
const cardB = document.querySelectorAll(".cardB");
cardB.forEach((item, index) => {
  item.addEventListener("click", () => {
    cardB[index].classList.toggle("active");
    cardB[index].classList.toggle("activeBack");
    cardB[index].classList.remove("preventAni");
  });
});

//----aLink子元素阻止冒泡--------------------------------------------------------//
const buttons = document.querySelectorAll(".a button");
buttons.forEach((item) =>
  item.addEventListener("click", (e) => {
    e.stopPropagation();
  })
);

//----project塊左右移動----------------------------------------------------------//
const project = document.querySelector(".project");
const arrowL = document.querySelectorAll(".arrowL");
const arrowR = document.querySelectorAll(".arrowR");
let offset = -33;
arrowL.forEach((item) => {
  item.addEventListener("click", () => {
    offset = offset + 33;
    project.style.transform = `translateX(${offset}%)`;
  });
});

arrowR.forEach((item) => {
  item.addEventListener("click", () => {
    offset = offset - 33;
    project.style.transform = `translateX(${offset}%)`;
  });
});
