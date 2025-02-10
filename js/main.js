function radioChecked(btn, page) {
  let answerBlock = document.querySelectorAll('.answer__block')
  let check = document.querySelectorAll('.check')
  let checkSpan = document.querySelectorAll('.check>span')
  let answerInput = document.querySelectorAll('.answer__input')
  let progress = document.querySelectorAll('.linear__label>span')
  let progressLine = document.querySelector('.linear__field>span')
  let nextBtn = document.querySelector('.next__btn')

  for (let i = 0; i < 4; i++) {
    let radio = answerInput[i];
    radio.addEventListener('click', () => {
      nextBtn.classList.add("is-blicked")
      const price = radio.parentElement.querySelector(".control-label").textContent
      sessionStorage.setItem("price", price)
      btn.removeAttribute('disabled');
      progress[1].innerHTML = '50%';
      progressLine.style.width = '50%';

      for (let j = 0; j < answerInput.length; j++) {
        if (j == i) {
          check[j].classList.add('check__active')
          checkSpan[j].classList.add('check_span-active')
          answerBlock[j].classList.add('answer__block-active')
        } else {
          check[j].classList.remove('check__active')
          checkSpan[j].classList.remove('check_span-active')
          answerBlock[j].classList.remove('answer__block-active')
        }
      }


      setTimeout(() => {
        page += 1
        moveToLastQuestion(page)
        nextBtn.classList.remove("is-blicked")

      }, 300)


    })
  }

  for (let i = 4; i < 11; i++) {
    let radio = answerInput[i];
    radio.addEventListener('click', () => {
      const checkedOnesLength = document.querySelectorAll("input[type='checkbox']:checked").length;
      console.log(checkedOnesLength)
      if (checkedOnesLength > 1) {
        const gg = document.querySelectorAll("input[type='checkbox']:checked")
        // console.log(checkedOnesLength gg)
        const vl = document.querySelector(".other-checkbox")
        console.log(vl)
        if (checkedOnesLength === 2 && gg[0].classList.contains("other-check") && !vl.value) {
          // gg.forEach((el) => {})
          nextBtn.classList.remove("is-blicked")
          btn.setAttribute("disabled", "disabled")
          return
        }
        // console.log(gg.includes)
        // console.log(gg)
        nextBtn.classList.add("is-blicked")
        btn.removeAttribute('disabled');
        progress[1].innerHTML = '95%';
        progressLine.style.width = '95%';
        answerBlock[i].classList.toggle('answer__block-active')
      } else {
        nextBtn.classList.remove("is-blicked")
        btn.setAttribute("disabled", "disabled")
      }

    })
  }

}

document.addEventListener('DOMContentLoaded', () => {
  let startBtn = document.querySelector('.start-page__button')
  let lastPage = document.querySelector('.last__page')
  let pageNavbar = document.querySelector('.page__navbar')
  let form = document.querySelector('form')
  let nextBtn = document.querySelector('.next__btn')
  let preeBtn = document.querySelector('.pree__btn')
  let agree = document.querySelector('#agree')
  let queastionsfirst = document.querySelector('.queastions__first')
  let queastionsSecond = document.querySelector('.queastions__second')
  let finalPage = document.querySelector('.final__page')

  let page = 1

  queastionsSecond.style.display = 'none'

  startBtn.addEventListener('click', () => moveToFirstQuestion(page))

  radioChecked(nextBtn, page)

  preeBtn.addEventListener("click", () => {
    page = 1
    nextBtn.textContent = 'Далее';
    queastionsfirst.classList.remove('over');
    queastionsSecond.style.display = "none"
    queastionsfirst.style.display = "block"
    nextBtn.removeAttribute("disabled")
  })

  if (agree.checked) {
    document.querySelector('.final__btn').removeAttribute('disabled')
  } else {
    document.querySelector('.final__btn').setAttribute('disabled', 'disabled')
  }
  agree.addEventListener('click', () => {
    console.log(agree.checked)
    if (agree.checked) {
      document.querySelector('.final__btn').removeAttribute('disabled')
    } else {
      document.querySelector('.final__btn').setAttribute('disabled', 'disabled')
    }
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const phoneNumberInput = document.getElementById("phone-number")
    const isPhoneNumberFilled = phoneNumberInput.value.replace(/(?!^\+)\D/g, '').length === 12 ? true : false
    const checkboxes = document.querySelectorAll(".b-radio > input[type='checkbox']:checked")

    let importantThings = ""
    checkboxes.forEach((el) => {

      importantThings += el.nextElementSibling.nextElementSibling.textContent + ","
    })

    if (isPhoneNumberFilled) {
      queastionsSecond.style.display = 'none'
      finalPage.style.opacity = '0'
      lastPage.classList.add('list__active')
      const templateParams = {
        price: sessionStorage.getItem("price"),
        importance: importantThings
      }
      emailjs.send('service_nh1lqe8', 'template_qsso4ws', templateParams).then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
        },
        (error) => {
          console.log('FAILED...', error);
        },
      );
    }
  })

  nextBtn.addEventListener('click', () => {
    page += 1
    if (nextBtn.textContent === "Последний шаг") {
      page = 3
    }
    if (page == 2) {
      moveToLastQuestion(page);
      // console.log("s")

    }
    if (page == 3) {
      nextBtn.setAttribute('disabled', 'disabled');
      nextBtn.style.display = 'none';
      queastionsSecond.classList.add('over');
      finalPage.style.left = '0';
      pageNavbar.style.display = 'none';
      const phoneNumberInput = document.getElementById("phone-number")
      var im = new Inputmask("+7 (999) 999-99-99");
      im.mask(phoneNumberInput);

      phoneNumberInput.addEventListener("input", ({ target }) => {
        target.nextElementSibling.nextElementSibling.classList.add("is-large-inactive")
        target.style.border = "1px solid #7e7e77"
        target.style.color = "white"
      })
      phoneNumberInput.addEventListener("blur", ({ target }) => {
        const isPhoneNumberFilled = target.value.replace(/(?!^\+)\D/g, '').length === 12 ? true : false
        if (!isPhoneNumberFilled) {
          target.nextElementSibling?.nextElementSibling?.classList.remove("is-large-inactive")
          target.style.border = "1px solid red"
          target.style.color = "red"
        }
      })

      setTimeout(() => {
        phoneNumberInput.focus()
      }, 600)

    }
  })
})

function moveToFirstQuestion(page) {
  page = 1
  let startBtn = document.querySelector('.start-page__button')
  let pages = document.querySelectorAll('.page')
  let logoBlock = document.querySelector('.logo__block')
  let startPageHeader = document.querySelector('.start-page__header')
  let startPageText = document.querySelector('.start-page__text')
  let startPageBg = document.querySelector('.start-page__layer')
  let startPpageContent = document.querySelector('.start-page__content')
  logoBlock.style.transform = "translateY(-100%)";
  startPageHeader.classList.add('hide');
  startPageText.classList.add('hide');
  startBtn.classList.add('hide');
  startPageBg.classList.add('black');
  startPpageContent.style.border = 'none'
  setTimeout(() => {
    pages[0].style.display = 'none'
    let answerBlock = document.querySelectorAll('.questions__wrapper')
    answerBlock[0].classList.add("fade-left")
  }, 1000);
}

function moveToLastQuestion(page) {
  console.log(page)
  let nextBtn = document.querySelector('.next__btn')
  let preeBtn = document.querySelector('.pree__btn')

  let queastionsfirst = document.querySelector('.queastions__first')
  let queastionsSecond = document.querySelector('.queastions__second')
  const progressPercent = document.querySelector(".progress-percent");
  progressPercent.textContent = "50%"
  nextBtn.setAttribute('disabled', 'disabled');
  nextBtn.textContent = 'Последний шаг';
  preeBtn.removeAttribute('disabled');
  preeBtn.classList.remove('disabled');
  preeBtn.children[0].style.fill = "rgb(255, 255, 255, 60%)"
  queastionsfirst.classList.add('over');

  setTimeout(() => queastionsfirst.style.display = 'none', 500);
  setTimeout(() => queastionsSecond.style.display = 'inline-block', 500);
  let progressLine = document.querySelectorAll('.linear__field>span')
  progressLine[1].style.width = "50%"

  const otherInfo = document.querySelector(".other-checkbox")
  otherInfo.addEventListener("input", (e) => {
    const previousElementCheckbox = e.target.previousElementSibling.querySelector("input");
    if (e.target.value) {
      previousElementCheckbox.checked = true
      nextBtn.classList.add("is-blicked")
      nextBtn.removeAttribute("disabled")
    } else {
      previousElementCheckbox.checked = false
      nextBtn.classList.remove("is-blicked")
      nextBtn.setAttribute("disabled", "disabled")
    }
  })

  otherInfo.addEventListener("blur", (e) => {
    if (!e.target.value) {
      const previousElementCheckbox = e.target.previousElementSibling.querySelector("input");
      previousElementCheckbox.checked = false
    }
  })
}
