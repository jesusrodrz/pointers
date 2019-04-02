function pointers(element) {
  element.addEventListener('click', e => {
    const target = e.target

    if (target.classList.contains('pointer__icon')) {
      const parent = target.closest('.pointer')

      parent.querySelector('.pointer__body').classList.add('active')
      target.classList.add('unactive')
    }
    if (target.classList.contains('pointer__close')) {
      const parent = target.closest('.pointer')
      const icon = parent.querySelector('.pointer__icon')

      parent.querySelector('.pointer__body').classList.remove('active')
      icon.classList.remove('unactive')
    }
  })
}

const container = document.getElementById('pointers')
if (document.getElementById('pointers')) {
  pointers(container)
}
