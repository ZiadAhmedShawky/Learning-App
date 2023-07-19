const login=async(email,password)=>{
 try {
    const res=await axios({
        method:'POST',
        url:'https://rsa-learning.onrender.com/auth/login',
        data:{
            email,
            password,
        }
     })

     if(res.data.status==='success'){
        location.assign('/')
    }
     //window.location.href='/'
 } catch (error) {
    alert(error.response.data.message);
 }
}

const formEl=document.querySelector('.login')
formEl.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    login(email,password)

})

