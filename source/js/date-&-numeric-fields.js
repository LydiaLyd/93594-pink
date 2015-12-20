(function() {
  if (!document.querySelector(".time__btns-group")) {
    return
  };

  moment().format();

  var groupTime = document.querySelector(".time__btns-group");
  var groupCompanions = document.querySelector(".companions__btns-group");

  var list = document.querySelector(".companions__list");
  var template = document.querySelector("#companion-template").innerHTML;
  var companionsAmount = document.querySelector("[name=companions-amount]");

  var btnRemove = document.querySelectorAll(".btn--companions");

  changeDuration(groupTime, "10");
  changeAmount(groupCompanions, "2");

  addFuncRemove(btnRemove[0]);
  addFuncRemove(btnRemove[1]);

  function addFuncRemove(btn) {
    btn.addEventListener("click", function(event) {
      event.preventDefault;
      companionsAmount.value--;
      var li = btn.parentNode;
      var list = li.parentNode;
      list.removeChild(li);
      changeNum();
    });
  };

  function changeNum() {
    var numbers = document.querySelectorAll(".companions__value");
    for (var i = 0; i < numbers.length; i++) {
      var num = numbers[i];
      num.innerHTML = i + 1;
    };
  };

  function changeDuration(group, initVal) {
    var minus = group.querySelector(".btn--minus");
    var plus = group.querySelector(".btn--plus");
    var amount = group.querySelector("[type=number]");

    amount.value = initVal;
    setDate();

    minus.addEventListener("click", function(event) {
      event.preventDefault();
      if (amount.value > 0) {
        amount.value--;
        setDate()
      };
    });

    plus.addEventListener("click", function(event) {
      event.preventDefault();
      amount.value++;
      setDate()
    });
  };

  function changeAmount(group, initVal) {
    var minus = group.querySelector(".btn--minus");
    var plus = group.querySelector(".btn--plus");
    var amount = group.querySelector("[type=number]");

    amount.value = initVal;

    minus.addEventListener("click", function(event) {
      event.preventDefault();
      if (amount.value > 0) {
        amount.value--;
      };

      var item = document.querySelector(".companions__item:last-child");
      list.removeChild(item);
    });

    plus.addEventListener("click", function(event) {
      event.preventDefault();
      amount.value++;

      var li = document.createElement("li");
      li.classList.add("companions__item");
      li.innerHTML = Mustache.render(template, {
        "number-$": companionsAmount.value,
        "companion-name-$": "companion-name-" + companionsAmount.value,
        "companion-niсkname-$": "companion-niсkname-" + companionsAmount.value
      });;

      list.appendChild(li);

      var btnRemove = li.querySelector(".btn--companions");
      btnRemove.addEventListener("click", function(event) {
        event.preventDefault;
        var list = li.parentNode;
        list.removeChild(li);
        amount.value--;
        changeNum();
      });
    });
  };

  function setDate() {
    var inputDeparture = document.querySelector("[name=departure-date]");
    var inputReturn = document.querySelector("[name=return-date]");
    var duration = +document.querySelector("[name=duration]").value;

    dateReturn = moment(inputDeparture.value).add(duration, "days").format("YYYY-MM-DD");
    inputReturn.value = dateReturn;
  };
})();
