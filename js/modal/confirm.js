$.confirm = function (options) {
   return new Promise((resolve, reject) => {
      const modal = $.modal({
         title: options.title,
         content: options.content,
         clossable: false,
         width: '400px',
         onClose() {
            modal.destroy()
         },
         buttons: [
            {
               text: 'Отменить', type: 'confirm', handler() {
                  modal.close()
                  reject()
               }
            },
            {
               text: 'Удалить', type: 'cancel', handler() {
                  modal.close()
                  resolve()
               }
            }
         ]
      })
      setTimeout(() => {
         modal.open()
      }, 100)
   })


}