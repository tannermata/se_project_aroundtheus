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
    const previewImageModal = document.querySelector('#preview-image-modal');

    // Buttons
    const profileEditButton = document.querySelector('#profile-edit-button');
    const profileCloseButton = profileEditModal.querySelector('.modal__close');
    const addCardCloseButton = addCardModal.querySelector('.modal__close');
    const addNewCardButton = document.querySelector('.profile__add-button');
    const previewImageCloseButton = previewImageModal.querySelector('.modal__close');
    
    // Form Data
    const profileName = document.querySelector('#profile-name');
    const profileDescription = document.querySelector('#profile-description');
    const profileNameInput = document.querySelector('#profile-name-input');
    const profileDescriptionInput = document.querySelector('#profile-description-input');
    const cardTitleInput = addCardForm.querySelector('#card-title-input');
    const cardLinkInput = addCardForm.querySelector('#card-link-input');
    const modalImage = previewImageModal.querySelector(".modal__image");
    const modalText = previewImageModal.querySelector(".modalText");
    
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

    function fillProfileForm() {
        profileNameInput.value = profileName.textContent;
        profileDescriptionInput.value = profileDescription.textContent;
    }
    
    function getCardElement(cardData) {
        const cardElement = cardTemplate.cloneNode(true);
        const cardImageElement = cardElement.querySelector('.card__image');
        const cardNameElement = cardElement.querySelector('.card__name');
        const likeButton = cardElement.querySelector('.card__like-button');
        const deleteButton = cardElement.querySelector('.card__delete-button');

        deleteButton.addEventListener('click', () => {
            cardElement.remove();
        });

        likeButton.addEventListener('click', () => {
            likeButton.classList.toggle('card__like-button_active');
        });

        cardImageElement.addEventListener("click", () => {
            openModal(previewImageModal);
            modalImage.src = cardData.link;
            modalImage.alt = cardData.name;
            modalText.textContent = cardData.name;
        });

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
        addCardForm.reset();
    }
    /* -------------------------------------------------------------------------- */
    /*                               Event Listeners                              */
    /* -------------------------------------------------------------------------- */
    
    profileEditButton.addEventListener('click', () => {
        fillProfileForm();
        openModal(profileEditModal);
    });

    // Open & Close
    addNewCardButton.addEventListener('click', () => openModal(addCardModal));
    profileCloseButton.addEventListener('click', () => closeModal(profileEditModal));
    addCardCloseButton.addEventListener('click', () => closeModal(addCardModal));
    previewImageCloseButton.addEventListener('click', () => closeModal(previewImageModal));

    // Submits
    profileForm.addEventListener('submit', handleProfileEditSubmit);
    addCardForm.addEventListener('submit', handleAddCardSubmit);
 
    initialCards.forEach((cardData) => renderCard(cardData, cardListElements));