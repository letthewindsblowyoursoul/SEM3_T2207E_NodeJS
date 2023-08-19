function fetchUsers() {
   fetch('/users')
     .then(response => response.json())
     .then(data => {
       const userList = document.getElementById('userList');
       userList.innerHTML = '';

       data.forEach(user => {
         const li = document.createElement('li');
         li.textContent = `${user.username} (${user.fullname}, ${user.address})`;

         const removeButton = document.createElement('button');
         removeButton.textContent = 'Remove';
         removeButton.addEventListener('click', () => removeUser(user._id));

         li.appendChild(removeButton);
         userList.appendChild(li);
       });
     })
     .catch(error => console.error('Error fetching users:', error));
 }

 // Function to remove a user
 function removeUser(userId) {
   fetch(`/remove-user/${userId}`, {
     method: 'DELETE'
   })
     .then(response => response.json())
     .then(data => {
       console.log('User removed:', data);
       fetchUsers();
     })
     .catch(error => console.error('Error removing user:', error));
 }
 // Initial fetch
 fetchUsers();

 // Submit form using AJAX

 $(document).ready(function () {
   $("#submit").click(function () {
      $.post("/request",
         {
            name: "viSion",
            designation: "Professional gamer"
         },
         function (data, status) {
            console.log(data);
         });
   });
});