import { identify, track, localStorageUpdate } from "./cxpTracker";

function login(userId){
	///login event if applicable
	identify(userId, {
		phoneNumber: userId
	})
}

function logout(){
	localStorage.clear()
	localStorageUpdate()
}

function clickMenuOffers(){
	track("clickMenuOffers", {})
}

function clickBtnApplyOffer(){
	track("clickBtnApplyOffer", {
		offerId: crypto.randomUUID()
	})
}



export {login, logout, clickBtnApplyOffer, clickMenuOffers}