const reviewForm = document.getElementById('review');
const reviewTextInput = document.getElementById('reviewText');
const ratingInput = document.getElementById('reviewRating');
const idUserInput = document.getElementById('idUser');
const idDeviceInput = document.getElementById('idDevice');

reviewForm.addEventListener('submit',async function (event) {
    event.preventDefault();
    console.log('hhahahah');
    
    const reviewText = reviewTextInput.value;
    const rating = ratingInput.value;
    const id_user = idUserInput.value; 
    const id_device = idDeviceInput.value;

    reviewTextInput.value = "";
    ratingInput.value = "5";

    try {
        const result = await fetch('http://localhost:3000/review', {
             headers: {
                 "Content-Type": "application/json",
             },
             body : JSON.stringify({
                 review_text : reviewText,
                 id_user : id_user,
                 id_device : id_device,
                 rating : rating
             }),
             method : "POST"
         }).then(res => res.json());
     
         console.log(result);
    } catch (error) {
        
    }

})