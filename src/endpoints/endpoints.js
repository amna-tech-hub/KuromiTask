const BASE_URL = import.meta.env.VITE_API_URL || "https://kuromi-backend.vercel.app";
console.log("🔗 API URL:", BASE_URL);
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
      credentials: 'include' // ✅ ADD THIS
    });
    if (!res.ok) {
      throw new Error("Server error can't fetch todo");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching todos:", error);
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
    console.error("API Call failed:", error);
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
      credentials: 'include', // ✅ ADD THIS
      body: JSON.stringify(data)
    });
    return await handleResponse(serverResponse);
  } catch (error) {
    console.error("API Call failed:", error);
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
    console.error("API Call failed:", error);
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
      credentials: 'include', // ✅ ADD THIS
      body: JSON.stringify({ 
        userId: data.userId, 
        categoryName: data.categoryName 
      })
    });
    return await handleResponse(serverResponse);
  } catch (error) {
    console.error("API Call failed:", error);
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
      credentials: 'include', // ✅ ADD THIS
      body: JSON.stringify(data)
    });
    return await handleResponse(serverResponse);
  } catch (error) {
    console.error("API Call failed:", error);
    throw error;
  }
}

// Logout User
export const logoutUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include' // ✅ Already has this
    });
    if (response.ok) {
      console.log('Logout successful');
      return await response.json();
    }
    throw new Error('Logout failed');
  } catch (error) {
    console.error('Logout failed', error);
    throw error;
  }
};

// Delete Subtodo
export const deletesubtodo = async (data) => {
  console.log(data, " your data came to remove your subtodo");
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
    console.error("API Call failed:", error);
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
      credentials: 'include', // ✅ ADD THIS
      body: JSON.stringify(data)
    });
    return await handleResponse(res);
  } catch (err) {
    console.log(err);
    throw err;
  }
}