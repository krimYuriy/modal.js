Element.prototype.appendAfter = function (element) {
   element.parentNode.insertBefore(this, element.nextSibling);
}, false;

function _createModalFooter(buttons = []) {
   if (buttons.length === 0) {
      const div = document.createElement('div')
      return div
   }
   const wrap = document.createElement('div')
   wrap.classList.add('modal__footer')

   return wrap
}

function _createModal(options) {
   const el = document.createElement('div')
   el.classList.add('modal')

   const DEFAULT_WIDTH = '600px'

   el.insertAdjacentHTML('afterbegin', `
         
         <div class="modal__overlay" data-close="true"></div>
         <div class="modal-container" style="width:${options.width || DEFAULT_WIDTH}">
            <div class="modal__header">
               <div class="modal__title">${options.title || 'modal'}</div>
                ${options.closable ? `<a href="" class="modal__btn-close" data-close="true">&times;</a>` : ''}
            </div>
            <div class="modal__body" data-content>
               ${options.content || ''}
            </div>
         </div>

      
   `)
   document.body.append(el)

   const footer = _createModalFooter(options.buttons)
   footer.appendAfter(document.querySelector('[data-content]'))

   options.buttons.forEach(btn => {
      const type = `modal__btn-${btn.type}`

      $btn = document.createElement('button')
      $btn.classList.add('btn-modal')
      $btn.classList.add(type)
      $btn.textContent = btn.text
      $btn.addEventListener('click', btn.handler)

      footer.append($btn)
   })

   return el
}


$.modal = function (options) {
   $el = _createModal(options)

   const ANIMATION_DURATION = 200
   let isClossing = false
   let isDestroing = false

   function handler(e) {
      if (e.target.dataset.close) {
         modal.close()
      }
   }

   $el.addEventListener('click', handler)

   const modal = {

      open() {
         if (isDestroing) {
            console.log('Модальное укно удалено');
         }
         !isClossing && $el.classList.add('open')
      },
      close() {
         isClossing = true
         $el.classList.remove('open')
         $el.classList.add('hide')
         setTimeout(() => {
            $el.classList.remove('hide')
            isClossing = false
            if (typeof options.onClose === 'function') {
               options.onClose()
            }
         }, ANIMATION_DURATION)
      },
      destroy() {
         isDestroing = true
         $el.remove()
         $el.removeEventListener('click', handler)
      },
      setContent(html) {
         $el.querySelector('[data-content]').innerHTML = html
      }
   }

   return modal
}