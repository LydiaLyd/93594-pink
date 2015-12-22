(function() {
  if (!("FormData" in window) || !document.querySelector(".story-form form")) {
    return;
  }

  var form = document.querySelector(".story-form form");
  var area = document.querySelector(".photos__list");

  var template = document.querySelector("#image-template").innerHTML;
  var queue = [];

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    var data = new FormData(form);

    queue.forEach(function(element) {
      data.append("images", element.file);
    });

    request(data, function(response) {
      console.log(response);
      popupSuccess.classList.add("popup-success--show")
    });
  });

  function request(data, fn) {
    var xhr = new XMLHttpRequest();
    var time = (new Date()).getTime();

    xhr.open("post", "https://echo.htmlacademy.ru/adaptive?" + time);

    xhr.addEventListener("readystatechange", function() {
      if (xhr.readyState == 4) {
        fn(xhr.responseText);
      }
    });

    xhr.send(data);
  }

  if ("FileReader" in window) {
    form.querySelector("#upload-photos").addEventListener("change", function() {
      var files = this.files;
      for (var i = 0; i < files.length; i++) {
        preview(files[i]);
      };
      this.value = "";
    })

    function preview(file) {
      if (file.type.match(/image.*/)) {
        var reader = new FileReader();

        reader.addEventListener("load", function(event) {
          var html = Mustache.render(template, {
            "image": event.target.result,
            "name": file.name
          });

          var li = document.createElement("li");
          li.classList.add("photos__item");
          li.innerHTML = html;

          area.appendChild(li);

          li.querySelector(".btn--cross").addEventListener("click", function(event) {
            event.preventDefault();
            removePreview(li);
          });

          // file - картинка в base64-кодировке (?), li нужен для удаления
          queue.push({
            "file": file,
            "li": li
          });
        });

        reader.readAsDataURL(file);
      }
    }

    function removePreview(li) {
      queue = queue.filter(function(element) {
        return element.li != li;
      });

      li.parentNode.removeChild(li);
    }
  }

  var popupSuccess = document.querySelector(".popup-success");
  var popupFailure = document.querySelector(".popup-failure");
  var btnClosePopup = document.querySelectorAll(".btn--popup");

  for (var j = 0; j < btnClosePopup.length; j++) {
    var btnClose = btnClosePopup[j];

    btnClose.addEventListener("click", function(event) {
      event.preventDefault();

      if (popupSuccess.classList.contains("popup-success--show")) {
        popupSuccess.classList.remove("popup-success--show")
      } else if (popupFailure.classList.contains("popup-failure--show")) {
        popupFailure.classList.remove("popup-failure--show")
      };
    })
  }
})();
