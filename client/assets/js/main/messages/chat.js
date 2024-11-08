import { lastGroupMessages } from "./lastGroupMessages.js";

export function chat() {

    const myChat = document.getElementById('myChat');
    const myChatMaximizeBtn = document.getElementById('myChatMaximizeBtn');
    const myChatExitButtonBtn = document.getElementById('myChatExitButtonBtn');
    const myChatRulesBtn = document.getElementById('myChatRulesBtn');
    const myChatRulesDiv = document.getElementById('myChatRulesDiv');
    const myGroupChatConversationImageBtn = document.getElementById('myGroupChatConversationImageBtn');
    const myGroupChatConversationTextBarDivImageInputs = document.getElementById('myGroupChatConversationTextBarDivImageInputs');
    const myIndividualChatConversationImageBtn = document.getElementById('myIndividualChatConversationImageBtn');
    const myIndividualChatConversationTextBarDivImageInputs = document.getElementById('myIndividualChatConversationTextBarDivImageInputs');
    const mySeeProfileSendMessageBtn = document.getElementById('mySeeProfileSendMessageBtn');

    mySeeProfileSendMessageBtn.addEventListener('click', (e) => {
        e.preventDefault();
        myChat.classList.add('display');

        lastGroupMessages();
    })

    myChatMaximizeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        myChat.classList.add('display');

        lastGroupMessages();
    });

    myChatExitButtonBtn.addEventListener('click', (e) => {
        e.preventDefault();

        if(myChatRulesDiv.classList.contains('display')) {
            myChatRulesDiv.classList.remove('display');
        } else {
            myChat.classList.remove('display');
        }
    })

    myChatRulesBtn.addEventListener('click', (e) => {
        e.preventDefault();
        myChatRulesDiv.classList.add('display');
    })

    myGroupChatConversationImageBtn.addEventListener('click', (e) => {
        e.preventDefault();
        myGroupChatConversationTextBarDivImageInputs.classList.contains('display') ? 
        myGroupChatConversationTextBarDivImageInputs.classList.remove('display') : myGroupChatConversationTextBarDivImageInputs.classList.add('display');
    })

    myIndividualChatConversationImageBtn.addEventListener('click', (e) => {
        e.preventDefault();
        myIndividualChatConversationTextBarDivImageInputs.classList.contains('display') ? 
        myIndividualChatConversationTextBarDivImageInputs.classList.remove('display') : myIndividualChatConversationTextBarDivImageInputs.classList.add('display');
    })

    const form = document.getElementById('myGroupChatConversationForm');
   
    form.addEventListener('submit', function (e) {

        console.log("Submitting form");
        e.preventDefault();

        const prePayLoad = new FormData(form);
        const payLoad = new URLSearchParams(prePayLoad);

        fetch('http://localhost/WindowsUniverse/server/controllers/messageControllers/sendMessageController.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: payLoad,
        })
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                lastGroupMessages();
                document.getElementById('myGroupChatConversationTextBarInput').value = '';
                const memeRadios = document.querySelectorAll('input[name="meme"]');
                memeRadios.forEach(radio => radio.checked = false);
            } else {
                console.log(data.error);
            }
        }) 
        .catch(error => console.log('Error', error));
    })
}

chat();