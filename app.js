const barberScript = {

   nextStepButtonNode: null, 
   thumbNode: null,
   menuButtonNode: null,
   menuListNode: null, 
   pagesCountNodes: null,
   allTitleNodes: null, 
   allDescriptionNodes: null,
   allImagesNodes: null,
   thumbNodeHeight: null,

   isVisibleMenuList: false,
   page: 1,


   initialState() {

      this.nextStepButtonNode = document.querySelector('.sidebar-button')
      this.thumbNode = document.querySelector('.thumb')
      this.menuButtonNode = document.querySelector('.menu-button')
      this.menuListNode = document.querySelector('.mobile-menu-list')
      this.pagesCountNodes = document.querySelectorAll('[data-page]')
      this.allTitleNodes = document.querySelectorAll('.title-wrapper > .text-block_title')
      this.allDescriptionNodes = document.querySelectorAll('.description-wrapper > .description')
      this.allImagesNodes = document.querySelectorAll('.image-wrapper')
   
      this.nextStepButtonNode.addEventListener('click', this.nextStep.bind(this))
      this.menuButtonNode.addEventListener('click', this.setVisibleMobileMenu.bind(this))
      document.body.addEventListener('click', this.closeMobileMenu.bind(this))

      this.thumbNodeHeight = 200 / this.allTitleNodes.length
      this.thumbNode.style.height = `${this.thumbNodeHeight}px`

      this.setStyles()

   },

   setStyles() {

      this.allTitleNodes.forEach(title => {
         if(Number(title.dataset.title) === this.page){
            title.classList.add('text-block_title__active')
         }
         else {
            title.classList.remove('text-block_title__active')
         }
      })
   
      this.allDescriptionNodes.forEach(desc => {
         if(Number(desc.dataset.desc) === this.page){
            desc.classList.add('description__active')
         }
         else {
            desc.classList.remove('description__active')
         }
      })
   
      this.allImagesNodes.forEach(img => {
         if((Number(img.dataset.img) === this.page)){
            img.classList.add('image-wrapper__active')
         }
         else {
            img.classList.remove('image-wrapper__active')
         }
      })
   
      this.pagesCountNodes.forEach(count => {
         if(count.dataset.page === "length") {
            count.innerText = String(this.allTitleNodes.length).padStart(2, '0')
         }
         else{
            count.innerText = String(this.page).padStart(2, '0')
         }
      })
   
      this.thumbNode.style.transform = `translateY(${this.thumbNodeHeight * (this.page - 1)}px)`

   },

   nextStep() {
  
      if(this.page < this.allTitleNodes.length){
         this.page = this.page + 1 
      }
      else {
         this.page = 1 
      }
   
      this.setStyles()
   
   },

   setVisibleMobileMenu(event) {

      event.stopPropagation()
      this.isVisibleMenuList = !this.isVisibleMenuList
      if(this.isVisibleMenuList){
         this.menuListNode.classList.add('mobile-menu-list__active')
      }
      else{
         this.menuListNode.classList.remove('mobile-menu-list__active')
      }

   },

   closeMobileMenu(event) {

      if(event.target.dataset.list !== 'list'){
         this.isVisibleMenuList = false
         this.menuListNode.classList.remove('mobile-menu-list__active')
      }
     
   }

}

barberScript.initialState()