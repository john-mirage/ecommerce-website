import { cart } from "@utils/cart";
import { getOneCamera } from "@utils/camera-api";

const heartBeatAnimation = [
  { transform: "scale(1)", offset: 0 },
  { transform: "scale(1.5)", offset: 0.14 },
  { transform: "scale(1)", offset: 0.28 },
  { transform: "scale(1.5)", offset: 0.42 },
  { transform: "scale(1)", offset: 0.7 },
];

const fadeInAndTranslateAnimation = [
  { opacity: 0, transform: "translateY(-1rem)", offset: 0},
  { opacity: 1, transform: "translateY(0)", offset: 1 }
];

const fadeOutAndTranslateAnimation = [
  { opacity: 1, transform: "translateY(0)", offset: 0 },
  { opacity: 0, transform: "translateY(-1rem)", offset: 1 }
];

const heartBeatAnimationTiming = {
  duration: 1000,
}

const fadeAnimationTiming = {
  duration: 300,
  easing: "cubic-bezier(.43,1.6,.56,1)",
}

class AppCartOverview extends HTMLElement {
  constructor() {
    super();
    this.buttonElement = this.querySelector('[data-name="cart-button"]');
    this.badgeElement = this.querySelector('[data-name="cart-badge"]');
    this.modalElement = this.querySelector('[data-name="cart-modal"]');
    this.listElement = this.querySelector('[data-name="cart-list"]');
    this.emptyMessageElement = this.querySelector('[data-name="cart-empty-message"]');
    this.cart = cart;
    this.isOpen = false;
    this.isAnimating = false;
    this.appCartOverviewItem = document.createElement("app-cart-overview-item");
    this.appCartOverviewItemSkeleton = document.createElement("app-cart-overview-item-skeleton");
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.abortController = false;
  }

  connectedCallback() {
    this.displayCartItems();
    this.buttonElement.addEventListener("click", this.handleButtonClick);
  }

  disconnectedCallback() {
    this.buttonElement.removeEventListener("click", this.handleButtonClick);
    //document.removeEventListener("click", this.handleOutsideClick);
  }

  displayCartItemsSkeletons() {
    this.listElement.innerHTML = "";
    for (let index = 0; index < this.cart.cart.size; ++index) {
      const skeleton = this.appCartOverviewItemSkeleton.cloneNode(true);
      this.listElement.append(skeleton);
    }
  }

  async displayCartItems() {
    if (this.abortController) {
      console.log("abort cart overview fetch");
      this.abortController.abort();
    }
    this.updateButtonBadge();
    this.displayCartItemsSkeletons();
    const { items, error } = await this.getCartItems();
    if (typeof error === "string") {
      if (error === "aborted") {
        console.log("aborted");
      }
    } else {
      this.listElement.innerHTML = "";
      items.forEach((item) => {
        const appCartOverviewItem = this.appCartOverviewItem.cloneNode(true);
        appCartOverviewItem.item = item;
        this.listElement.append(appCartOverviewItem);
      });
    }
  }

  async getCartItems() {
    let items = [];
    let itemsError = false;
    for (const uuid of this.cart.cart.keys()) {
      this.abortController = new AbortController();
      const signal = this.abortController.signal;
      const { camera, error } = await getOneCamera(uuid, signal);
      if (typeof error === "string") {
        if (error === "aborted" || error === "error") {
          itemsError = error;
          break;
        }
        itemsError = error;
      } else if (error === "not-found") {
        this.cart.deleteCameraByUuid(uuid);
      } else {
        items.push(camera);
      }
    }
    this.abortController = false;
    return { items, error: itemsError };
  }

  handleButtonClick() {
    if (!this.isAnimating) {
      if (this.isOpen) {
        this.closeModal();
      } else {
        this.openModal();
      }
    }
  }

  handleOutsideClick(event) {
    if (!this.contains(event.target)) {
      this.closeModal();
    }
  }

  openModal() {
    this.isAnimating = true;
    this.modalElement.classList.replace("hidden", "block");
    const fadeIn = this.modalElement.animate(fadeInAndTranslateAnimation, fadeAnimationTiming);
    fadeIn.onfinish = () => {
      this.isOpen = true;
      this.isAnimating = false;
      //document.addEventListener("click", this.handleOutsideClick);
    };
  }

  closeModal() {
    //document.removeEventListener("click", this.handleOutsideClick);
    this.isAnimating = true;
    const fadeOut = this.modalElement.animate(fadeOutAndTranslateAnimation, fadeAnimationTiming);
    fadeOut.onfinish = () => {
      this.modalElement.classList.replace("block", "hidden");
      this.isOpen = false;
      this.isAnimating = false;
    };
  }

  updateButtonBadge() {
    if (this.cart.itemsNumber > 0) {
      if (!this.contains(this.badgeElement)) {
        this.buttonElement.append(this.badgeElement);
      }
      this.badgeElement.animate(heartBeatAnimation, heartBeatAnimationTiming);
    } else {
      if (this.contains(this.badgeElement)) {
        this.buttonElement.removeChild(this.badgeElement);
      }
    }
    this.badgeElement.textContent = String(this.cart.itemsNumber);
  }
}

export default AppCartOverview;