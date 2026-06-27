  const BASE_URL = import.meta.env.VITE_API_URL || "https://kuromi-backend.vercel.app";
//  const BASE_URL = 'http://localhost:3000'
// Helper function for consistent error handling
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// GET Todos
export async function getTodos(userid) {
  try {
    const res = await fetch(`${BASE_URL}/todo/gettodo/${userid}`, {
      credentials: 'include' 
    });
    if (!res.ok) {
      throw new Error("Server error can't fetch todo");
    }
    return res.json();
  } catch (error) {
    throw error;
  }
}

// Add User (Register)
export const addUser = async (data) => {
  try {
    const serverResponse = await fetch(`${BASE_URL}/auth/register-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', // ✅ ADD THIS
      body: JSON.stringify(data)
    });
    return await handleResponse(serverResponse);
  } catch (error) {
    throw error;
  }
}

// Add Category
export const addCategory = async (data) => {
  try {
    const serverResponse = await fetch(`${BASE_URL}/todo/addcategory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', 
      body: JSON.stringify(data)
    });
    return await handleResponse(serverResponse);
  } catch (error) {
    throw error;
  }
}

// Add Subtodo
export const addsubtodo = async (data) => {
  try {
    const serverResponse = await fetch(`${BASE_URL}/todo/getsubtodo/${data.categoryname}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', // ✅ ADD THIS
      body: JSON.stringify({ todoTitle: data.todoTitle })
    });
    return await handleResponse(serverResponse);
  } catch (error) {
    throw error;
  }
}

// Get All Subtodos
export const getallsubtodo = async (data) => {
  try {
    const serverResponse = await fetch(`${BASE_URL}/todo/subtodo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', 
      body: JSON.stringify({ 
        userId: data.userId, 
        categoryName: data.categoryName 
      })
    });
    return await handleResponse(serverResponse);
  } catch (error) {
    throw error;
  }
}

// Login User
export const loginUser = async (data) => {
  try {
    const serverResponse = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', 
      body: JSON.stringify(data)
    });
    return await handleResponse(serverResponse);
  } catch (error) {
    throw error;
  }
}

// Logout User
export const logoutUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    if (response.ok) {
      return await response.json();
    }
    throw new Error('Logout failed');
  } catch (error) {
    throw error;
  }
};

// Delete Subtodo
export const deletesubtodo = async (data) => {
  try {
    const serverResponse = await fetch(`${BASE_URL}/todo/deletesubtodo/${data.subtodocat}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', // ✅ ADD THIS
      body: JSON.stringify({ 
        userid: data.userid, 
        subtodoid: data.subtodoid 
      })
    });
    return await handleResponse(serverResponse);
  } catch (error) {
    throw error;
  }
}

// Verify OTP
export const otpDataSubmition = async (data) => {
  try {
    let res = await fetch(`${BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', 
      body: JSON.stringify(data)
    });
    return await handleResponse(res);
  } catch (err) {
    throw err;
  }
}

//resend OTP

export const resendOtp = async (data) => {
  try {
    let res = await fetch(`${BASE_URL}/auth/resend-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', 
      body: JSON.stringify(data)
    });
    return await handleResponse(res);
  } catch (err) {
    throw err;
  }
}

export const deletetodo = async (data) => {
  try {
    const serverResponse = await fetch(`${BASE_URL}/todo/deletetodo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', 
      body: JSON.stringify({ 
        todoid: data._id, 
       
      })
    });
    return await handleResponse(serverResponse);
  } catch (error) {
    throw error;
  }
}