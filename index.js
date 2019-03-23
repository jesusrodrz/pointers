function pointers(element) {
  element.addEventListener('click', e => {
    console.log(e, e.target)
    const target = e.target

    if (target.classList.contains('pointer__icon')) {
      const parent = target.closest('.pointer')

      parent.querySelector('.pointer__body').classList.add('active')
    }
    if (target.classList.contains('pointer__close')) {
      const parent = target.closest('.pointer')

      parent.querySelector('.pointer__body').classList.remove('active')
    }
  })
}

const container = document.getElementById('pointers')
if (document.getElementById('pointers')) {
  pointers(container)
}
