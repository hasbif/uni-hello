//constants
const planeUrl = "https://aixp-rudder-api-aks.digitallab.id/1982c4cc-d2eb-40e0-83e5-b32863520d20/d3c3beb2-44d5-466e-b3f9-36f09edbae85"
const writeKey = "d6ce9950-9b7f-470d-9f3b-c60a16981102"
const decodedWriteKey = btoa(writeKey)

async function trackerSender(bodyObj){
	fetch(`${planeUrl}/v1/batch`, {
		method: "POST",
		body: JSON.stringify(bodyObj),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
			"Authorization": `Basic ${decodedWriteKey}`
		}
	}).then(res=>{
		console.log(res)
	}).catch(err=>{
		console.log(error)
	});
}

//generated guid
const genID = ()=>{
	return crypto.randomUUID()
}

//when new session, create ananymous id first, and save it
export const newSession = ()=>{
const guid = genID()
//for example in web, save in localstorage 
localStorage.setItem("ananymousId", guid)
localStorageUpdate()
return guid
}

//retrieve guid from wherever it was saved, or generate a new one
const getAnonId = ()=>{
	const prevGuid = localStorage.getItem("ananymousId")
	if (!!prevGuid) return prevGuid
	return newSession()
}


export const identify = (userId, traitsObject)=>{
	const body = {
		"batch":[
			 {
					"anonymousId": getAnonId(),
					"context":{
						"traits": traitsObject //can be multiple traits such as when registering or updating user traits, or just your identity trait when loging in, etc.
					},
					"messageId":`api-${genID()}`,
					"originalTimestamp":Date.now(),
					"sentAt":Date.now(),
					"type":"identify",
					"userId": userId
			 }
		],
		"sentAt":Date.now()
 }
 trackerSender(body)
 //save userId and traits somewhere, alternatively you can fetch them from your backend
 localStorage.setItem("phoneNumber", userId)
 localStorageUpdate()
} 

//retrieve user data
const getCurrentUser = ()=>{
	const userId = localStorage.getItem("phoneNumber")
	//traits based of data manager
	const traits = {
		"phoneNumber": userId
		//...other traits if needed
	}
	return {
		userId,
		"context":{
			"traits": traits
	 }
	}
}

export const track = (eventName, eventProperties) => {
	const currentUser = getCurrentUser()
	const body = {
		"batch":[
			 {
					"anonymousId":getAnonId(),
					"event": eventName,
					"messageId":`api-${genID()}`,
					"originalTimestamp":Date.now(),
					"sentAt":Date.now(),
					"properties": eventProperties,
					"type":"track",
					...(!!currentUser.userId ? currentUser : {})
			 }
		],
		"sentAt":Date.now()
 }
 trackerSender(body)
}

//skip if not using storage
export function localStorageUpdate(){
	window.dispatchEvent(new CustomEvent('localstorage-changed', {
		detail: {
			phoneNumber: localStorage.getItem("phoneNumber"),
			anonymousId: localStorage.getItem("anonymousId")
		}
	}));
}