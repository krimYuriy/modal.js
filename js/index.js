let cards = [
   { id: 1, price: '20$', title: 'Avacado', url: 'https://trip-advice.ru/wp-content/uploads/2020/01/frukty-v-indii-po-mesyatsam-foto-i-nazvaniya-1.jpg' },
   { id: 2, price: '12$', title: 'Banana', url: 'https://vtorrevieje.com/wp-content/uploads/2019/01/banan.jpg' },
   { id: 3, price: '15$', title: 'Apple', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQulzMM07AZBkO63ZV7jLjBy7_xGwoV2_JtGg&usqp=CAU' }
]

function _createFruitCard() {
   if (cards.length === 0) {
      const div = document.createElement('div')
      document.querySelector('.fruits-cards__row').append(div)
   }

   cards.forEach(fruit => {
      const fruitCard = document.createElement('div')
      fruitCard.classList.add('fruits-cards__item')
      fruitCard.classList.add('item-card')
      fruitCard.insertAdjacentHTML('afterbegin', `
         
            <img
               src="${fruit.url}}"
               alt="" class="item-card__img">
            <div class="item-card__title">${fruit.title}</div>
            <div class="item-card__footer" >
               <button class="btn-modal modal__btn-confirm" data-type="show-price" data-id="${fruit.id}">Посмотреть цену</button>
               <button class="btn-modal modal__btn-cancel" data-type="remove" data-id="${fruit.id}">Удалить</button>
            </div>
         
      `)

      document.querySelector('.fruits-cards__row').append(fruitCard)

   })

}

_createFruitCard()

document.body.addEventListener('click', (e) => {
   const type = e.target.dataset.type
   const id = +e.target.dataset.id
   const fruit = cards.find(fruit => fruit.id === id)

   if (type === 'show-price') {

      const priceModal = $.modal({
         title: 'Цена товара',
         closable: true,
         width: '400px',
         onClose() {
            priceModal.destroy()
         },
         buttons: [
            {
               text: 'Ok', type: 'confirm', handler() {
                  priceModal.close()
               }
            }
         ]
      })

      priceModal.setContent(`
        <p>Цена на ${fruit.title}: <strong>${fruit.price}</strong></p>
      `)

      setTimeout(() => {
         priceModal.open()
      }, 100)
   } else if (type === 'remove') {
      $.confirm({
         title: 'Вы уверены ?',
         content: `<p>Вы удаляете ${fruit.title}</p>`
      })
         .then(() => {
            const fruits = document.querySelectorAll('.item-card')
            for (let i of fruits) {
               i.remove()
            }
            cards = cards.filter(f => f.id !== id)
            _createFruitCard()
         })
         .catch(() => {
            console.log('cancel');
         })
   }

})







