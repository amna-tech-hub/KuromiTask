import React from 'react'

function ResetPassword() {
    function handelformsubmit(e){
        e.preventDefault()
    let  formData=new FormData(e.target)
     let data=Object.fromEntries(formData)
        
    }
  return (
    <>
    <div>ResetPassword</div>
    <form action="" onSubmit={handelformsubmit}>
        <input type="text" placeholder='enter your new password' name='password'/>
                <input type="text" placeholder='confirm password' name='confirmpassword'/>
<button>Reset Password</button>
    </form>
    </>
  )
}

export default ResetPassword