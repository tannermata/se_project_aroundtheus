const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    },
    {
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    },
    {
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    },
    {
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    },
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    },
    ];
     
    /* -------------------------------------------------------------------------- */
    /*                                  Elelments                                 */
    /* -------------------------------------------------------------------------- */
    
        const cardTemplate = document.querySelector('#card-template').content.firstElementChild;

    // Wrappers
    const cardListElements = document.querySelector('.cards__list');
    const profileEditModal = document.querySelector('#profile-edit-modal');
    const profileForm = document.forms['profileForm'];
    const addCardModal = document.querySelector('#add-card-modal');
    const addCardForm = document.forms['addCardForm'];

    // Buttons
    const profileEditButton = document.querySelector('#profile-edit-button');
    const profileCloseButton = profileEditModal.querySelector('.modal__close');
    const addCardCloseButton = addCardModal.querySelector('.modal__close');
    const profileName = document.querySelector('#profile-name');
    const profileDescription = document.querySelector('#profile-description');
    const addNewCardButton = document.querySelector('.profile__add-button')
    
    // Form Data
    const profileNameInput = document.querySelector('#profile-name-input');
    const profileDescriptionInput = document.querySelector('#profile-description-input');
    const cardTitleInput = addCardForm.querySelector('#card-title-input');
    const cardLinkInput = addCardForm.querySelector('#card-link-input');
    
    /* -------------------------------------------------------------------------- */
    /*                                  Functions                                 */
    /* -------------------------------------------------------------------------- */
    
    function closeModal(modal) {
        modal.classList.remove('modal_opened');
    }

    function openModal(modal) {
        modal.classList.add('modal_opened');
    }

    function renderCard(cardData, wrapper) {
        const cardElement = getCardElement(cardData);
        wrapper.prepend(cardElement);
    }
    
    function getCardElement(cardData) {
        const cardElement = cardTemplate.cloneNode(true);
        const cardImageElement = cardElement.querySelector('.card__image');
        const cardNameElement = cardElement.querySelector('.card__name');

        cardImageElement.src = cardData.link;
        cardImageElement.alt = cardData.name;
        cardNameElement.textContent = cardData.name;

        return cardElement;
    }
    
    /* -------------------------------------------------------------------------- */
    /*                               Event Handlers                               */
    /* -------------------------------------------------------------------------- */
    
    function handleProfileEditSubmit(e) {
        e.preventDefault();
        profileName.textContent = profileNameInput.value;
        profileDescription.textContent = profileDescriptionInput.value;
        closeModal(profileEditModal);
    }

    function handleAddCardSubmit(e) {
        e.preventDefault();
        const name = cardTitleInput.value;
        const link = cardLinkInput.value;
        renderCard({name, link}, cardListElements);
        closeModal(addCardModal);
    }
    /* -------------------------------------------------------------------------- */
    /*                               Event Listeners                              */
    /* -------------------------------------------------------------------------- */
    
    profileEditButton.addEventListener('click', () => { 
        profileNameInput.value = profileName.textContent;
        profileDescriptionInput.value = profileDescription.textContent;
        openModal(profileEditModal);
    });

    addNewCardButton.addEventListener('click', () => openModal(addCardModal));
    profileCloseButton.addEventListener('click', () => closeModal(profileEditModal));
    addCardCloseButton.addEventListener('click', () => closeModal(addCardModal));
    profileForm.addEventListener('submit', handleProfileEditSubmit);
    addCardForm.addEventListener('submit', handleAddCardSubmit);
 
    initialCards.forEach((cardData) => renderCard(cardData, cardListElements));