import {useState} from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];


export default function App(){

  const [selectedFriend,setSelectedFriend] = useState(null);
  const [Friends, setFriends] = useState(initialFriends);
  const [showAddFriend , setShowAddFriend ] = useState()  

  function handleshowAddFriend(){
    setShowAddFriend((showAddFriend) => !showAddFriend);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          Friends={Friends}
          setSelectedFriend={setSelectedFriend}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && (
          <FormAddFriend
            setFriends={setFriends}
            Friends={Friends}
            setShowAddFriend={setShowAddFriend}
          />
        )}
        <button className="button" onClick={handleshowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          setSelectedFriend={setSelectedFriend}
        />
      )}
    </div>
  );
}

function FriendList({ Friends, setSelectedFriend, selectedFriend }) {
  const friends = Friends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          setSelectedFriend={setSelectedFriend}
          selectedFriend={selectedFriend}
          key={friend.id}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, setSelectedFriend, selectedFriend }) {
  return (
    <li className={friend.id === selectedFriend?.id ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 ? (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)} ₹
        </p>
      ) : friend.balance > 0 ? (
        <p className="green">
          {friend.name} owes you {friend.balance} ₹
        </p>
      ) : (
        <p>You and {friend.name} are even</p>
      )}
      <button
        className="button"
        onClick={() =>
          friend.id === selectedFriend?.id
            ? setSelectedFriend(null)
            : setSelectedFriend(friend)
        }
      >
        {friend.id === selectedFriend?.id ? "Close" : "Select"}
      </button>
    </li>
  );
}

function FormAddFriend({ setFriends, Friends, setShowAddFriend }) {
  const [friendName, setFriendName] = useState("");
  const [imageURL, setImageURL] = useState("https://i.pravatar.cc/48?u=118836");

  const id = Date.now();
  const image = `https://i.pravatar.cc/48?u=${id}`;
  function handleSubmit(e) {
    e.preventDefault();

    if (!friendName || !imageURL) return;
    const newFriend = {
      id: id,
      name: friendName,
      balance: 0,
      image: image,
    };
    setFriendName("https://i.pravatar.cc/48?u=118836");
    setImageURL("");
    setFriends([...Friends, newFriend]);
    setShowAddFriend((showAddFriend) => !showAddFriend);
  }

  return (
    <form className="form-add-friend">
      <label>🧑‍🤝‍🧑 Name</label>
      <input
        type="text"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
        placeholder="your friends name..."
      />
      <label>🖼️ Image URL</label>
      <input
        type="text"
        value={imageURL}
        onChange={(e) => setImageURL(e.target.value)}
      />
      <button className="button" onClick={(e) => handleSubmit(e)}>
        Add
      </button>
    </form>
  );
}


function FormSplitBill({ selectedFriend, setSelectedFriend }) {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>💰 Bill Value</label>
      <input type="text" />
      <label>🕴️ Your Expense</label>
      <input type="text" />
      <label>🧑‍🤝‍🧑 {selectedFriend.name}'s Expense</label>
      <input type="text" disabled />
      <label>😋Who is paying the bill </label>
      <select>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <button className="button" onClick={() => setSelectedFriend(null)}>
        Add
      </button>
    </form>
  );
}