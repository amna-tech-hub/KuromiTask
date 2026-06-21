const BASE_URL = "https://kuromi-backend.vercel.app"

export async function getTodos(userid){
  const res = await fetch(`${BASE_URL}/todo/gettodo/${userid}`);
  if(!res.ok){
      throw new Error("server error can't fetch todo ")
  }
return res.json(); }

export const addUser=async(data)=>{
    try {
    const serverResponse = await fetch(`${BASE_URL}/auth/register-user`, {
    method: 'POST',   
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data) 
        });

    const result = await serverResponse.json();
    return result;
  } catch (error) {
    console.error("API Call failed:", error);
  }
}

export const addCategory=async(data)=>{
    try {
    const serverResponse = await fetch(`${BASE_URL}/todo/addcategory`, {
    method: 'POST',   
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data) 
        });

    const result = await serverResponse.json();
    return result;
  } catch (error) {
    console.error("API Call failed:", error);
  }
}

export const addsubtodo=async(data)=>{
    try {
    const serverResponse = await fetch(`${BASE_URL}/todo/getsubtodo/${data.categoryname}`, {
    method: 'POST',   
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ todoTitle: data.todoTitle }) 
        });

    const result = await serverResponse.json();
    return result;
  } catch (error) {
    console.error("API Call failed:", error);
  }
}

export const getallsubtodo=async(data)=>{
    try {
    const serverResponse = await fetch(`${BASE_URL}/todo/subtodo`, {
    method: 'POST',   
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ userId:data.userId,categoryName:data.categoryName }) 
        });

    const result = await serverResponse.json();
    return result;
  } catch (error) {
    console.error("API Call failed:", error);
  }
}

export const loginUser=async(data)=>{
    try {
    const serverResponse = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',   
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data) 
        });

    const result = await serverResponse.json();
    return result;
  } catch (error) {
    console.error("API Call failed:", error);
  }
}

export const logoutUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include' 
    });
    if (response.ok) {
      console.log('Logout successful');
    }
  } catch (error) {
    console.error('Logout failed', error);
  }
};

export const deletesubtodo=async(data)=>{
    console.log(data," your data came to remove your subtodo");
    try {
    const serverResponse = await fetch(`${BASE_URL}/todo/deletesubtodo/${data.subtodocat}`, {
    method: 'POST',   
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ userid:data.userid,subtodoid:data.subtodoid }) 
        });

    const result = await serverResponse.json();
    return result;
  } catch (error) {
    console.error("API Call failed:", error);
  }
}

export const otpDataSubmition=async(data)=>{
  try{
    let res = await fetch(`${BASE_URL}/auth/verify-otp`, {
        method: 'POST',   
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data) 
    });
    return res.json();
  }
  catch(err){
    console.log(err);
  }
}
