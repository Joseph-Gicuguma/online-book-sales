// This is a debugging script to simulate the routing logic in App.js
// Run this in the browser console to debug routing issues

function debugRouting() {
  // Get the user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  
  console.log("User object from localStorage:", user);
  
  if (!user) {
    console.log("No user found in localStorage. Should redirect to signin page.");
    return;
  }
  
  console.log("isAdmin property:", user.isAdmin);
  console.log("Type of isAdmin:", typeof user.isAdmin);
  
  // Simulate the routing logic from App.js
  if (user.isAdmin === true) {
    console.log("User is admin. Should redirect to /dashboard@admin");
  } else if (user.isAdmin === false) {
    console.log("User is not admin. Should redirect to /dashboard@member");
  } else {
    console.log("isAdmin is neither true nor false. Value:", user.isAdmin);
  }
  
  // Test with loose comparison
  if (user.isAdmin == true) {
    console.log("Loose comparison: User is admin");
  } else {
    console.log("Loose comparison: User is not admin");
  }
  
  // Suggest fix if needed
  if (typeof user.isAdmin !== 'boolean') {
    console.log("FIX NEEDED: isAdmin is not a boolean. Try updating localStorage with:");
    const fixedUser = {...user, isAdmin: Boolean(user.isAdmin)};
    console.log("localStorage.setItem('user', '" + JSON.stringify(fixedUser) + "');");
  }
}

// Call the function
debugRouting(); 