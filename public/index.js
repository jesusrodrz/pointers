function pointers(element) {
  let current

  element.addEventListener('click', e => {
    const target = e.target

    if (
      target.classList.contains('pointer__icon') &&
      !target.classList.contains('pointer__icon--red')
    ) {
      const parent = target.closest('.pointer')
      parent.querySelector('.pointer__body').classList.add('active')
      target.classList.add('unactive')
      if (current && parent !== current) {
        const parentN = current
        const icon = parentN.querySelector('.pointer__icon')

        parentN.querySelector('.pointer__body').classList.remove('active')
        icon.classList.remove('unactive')
      }
      current = parent
    }
    if (target.classList.contains('pointer__close')) {
      const parent = target.closest('.pointer')
      const icon = parent.querySelector('.pointer__icon')

      parent.querySelector('.pointer__body').classList.remove('active')
      icon.classList.remove('unactive')
    }
  })
}

const containers = [...document.getElementsByClassName('container')]
console.log(containers)
if (containers) {
  containers.forEach(element => {
    pointers(element)
  })
}

{
  const pointer = {
    render:
      'https://ucbc70940b0f1c71998375612d9c.previews.dropboxusercontent.com/p/thumb/AAZCnRNt8mJs9QVOh6wTj28W62a7Kk3J7qku4FNzd12VclG2gbwcGrMTOH7Kr9XmTQIU0wgbUiipqjl9wOyRTdWDaDC4tTzUzFAn5gOoTncBQfz2-nIIdG25Thr8o_1gDCVFmbWXY6222doW8SDpDxwhMqkI3uqycevwQxy58RbGz8xD0gdfDAx0PsLwiLRjxCRIpkXOupfbVjBjfbda4BZ5-cCmXRXb_8MVOXs-cNO3eyTkDSs-t75hVRHubN-Z2-BjLP5XN7gVG35cdKHgQEJpySrXzp308bijaUzQg4HS_NREGZcd5ak3uvDhdho8BxvJo5xpIifzWLhCB74FFDeh_dOvpEGONnjquyvfEzPrz-IshGLur0eq8R-apH8C6a8/p.jpeg?size_mode=5',
    pointers: [
      {
        x: '40',
        y: '30',
        items: [
          {
            title: 'Difusores',
            src:
              'https://uc81eec0ed6424f7868a1d405d53.previews.dropboxusercontent.com/p/thumb/AAbE9Ihje2aZkGzgJlg8fgQDnsnXKvpU3T9dG1tOzT765YHjvRqI5Jg7OLxcV6HkmzfeVkGqHth8yw5AEBhk0tARDed4FTtbFBYy1apKyXDqubhDZuTwc5IynXDrNzUcOlzCTNFAtQPjAiZRWu2w2BjIlhWtbI3kP7dbXGfNRwjfn5wZMgtiGVJArmem1mr3xA0CjoigV9Mwm8sCqUg3Vj9Zb_roUyKNDKiRyPSNpmKWKK7bbv3F6HdfUgwz-0UZG7DZyrCq1WU4l4fBrVjzrOOo3CffNuYMXXduUgyOmsl-kNVEyvaDc1S-L7uP93cruzhjwNPLS88OzhCIfmA9zNsEvRltRkuIxZ22iVwtWAUT_wsiXupySlYN8Eoa60XUdzQ/p.jpeg?size=1600x1200&size_mode=3'
          },
          {
            title: 'Difusores',
            src:
              'https://uc81eec0ed6424f7868a1d405d53.previews.dropboxusercontent.com/p/thumb/AAbE9Ihje2aZkGzgJlg8fgQDnsnXKvpU3T9dG1tOzT765YHjvRqI5Jg7OLxcV6HkmzfeVkGqHth8yw5AEBhk0tARDed4FTtbFBYy1apKyXDqubhDZuTwc5IynXDrNzUcOlzCTNFAtQPjAiZRWu2w2BjIlhWtbI3kP7dbXGfNRwjfn5wZMgtiGVJArmem1mr3xA0CjoigV9Mwm8sCqUg3Vj9Zb_roUyKNDKiRyPSNpmKWKK7bbv3F6HdfUgwz-0UZG7DZyrCq1WU4l4fBrVjzrOOo3CffNuYMXXduUgyOmsl-kNVEyvaDc1S-L7uP93cruzhjwNPLS88OzhCIfmA9zNsEvRltRkuIxZ22iVwtWAUT_wsiXupySlYN8Eoa60XUdzQ/p.jpeg?size=1600x1200&size_mode=3'
          },
          {
            title: 'Difusores',
            src:
              'https://uc81eec0ed6424f7868a1d405d53.previews.dropboxusercontent.com/p/thumb/AAbE9Ihje2aZkGzgJlg8fgQDnsnXKvpU3T9dG1tOzT765YHjvRqI5Jg7OLxcV6HkmzfeVkGqHth8yw5AEBhk0tARDed4FTtbFBYy1apKyXDqubhDZuTwc5IynXDrNzUcOlzCTNFAtQPjAiZRWu2w2BjIlhWtbI3kP7dbXGfNRwjfn5wZMgtiGVJArmem1mr3xA0CjoigV9Mwm8sCqUg3Vj9Zb_roUyKNDKiRyPSNpmKWKK7bbv3F6HdfUgwz-0UZG7DZyrCq1WU4l4fBrVjzrOOo3CffNuYMXXduUgyOmsl-kNVEyvaDc1S-L7uP93cruzhjwNPLS88OzhCIfmA9zNsEvRltRkuIxZ22iVwtWAUT_wsiXupySlYN8Eoa60XUdzQ/p.jpeg?size=1600x1200&size_mode=3'
          }
        ]
      }
    ]
  }
}
