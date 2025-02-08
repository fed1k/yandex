function radioChecked(btn, page) {
  let answerBlock = document.querySelectorAll('.answer__block')
  let check = document.querySelectorAll('.check')
  let checkSpan = document.querySelectorAll('.check>span')
  let answerInput = document.querySelectorAll('.answer__input')
  let progress = document.querySelectorAll('.linear__label>span')
  let progressLine = document.querySelector('.linear__field>span')

  for (let i = 0; i < 4; i++) {
    let radio = answerInput[i];
    radio.addEventListener('click', () => {
      console.log("clicked")
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
        console.log(page)

      }, 300)


    })
  }

  for (let i = 4; i < 11; i++) {
    let radio = answerInput[i];
    radio.addEventListener('click', () => {
      btn.removeAttribute('disabled');
      progress[1].innerHTML = '95%';
      progressLine.style.width = '95%';

      check[i].classList.toggle('checkbox__active')
      checkSpan[i].classList.toggle('checkbox__span-active')
      answerBlock[i].classList.toggle('answer__block-active')

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

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const phoneNumberInput = document.getElementById("phone-number")
    const isPhoneNumberFilled = phoneNumberInput.value.replace(/(?!^\+)\D/g, '').length === 12 ? true : false

    if (isPhoneNumberFilled) {
      lastPage.classList.add('list__active')
    }
  })

  nextBtn.addEventListener('click', () => {
    page += 1
    if (nextBtn.textContent === "Последний шаг") {
      page = 3
    }
    if (page == 2) {
      moveToLastQuestion(page);

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
          target.nextElementSibling.nextElementSibling.classList.remove("is-large-inactive")
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
}
