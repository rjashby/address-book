// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, emailAddress, physAddress) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emailAddress = emailAddress;
  this.address = {};
  this.addressId = 0;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

Contact.prototype.addAddress = function(address) {
  address.id = this.assignId();
  this.addresses[address.addressId] = address;
};

Contact.prototype.assignId = function() {
  this.addressId += 1;
  return this.addressId;
};

Contact.prototype.findAddress = function(id) {
  if (this.addresses[id] != undefined) {
    return this.addresses[id];
  }
  return false;
};

// Business Logic for Address ---------

function Address(address, addressType) {
  this.address = address;
  this.addressType = addressType;
  this.addressId = 0
}


// User Interface Logic ---------
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
}

function displayAddressDetails(contact) {
  let addressList = $("ul#addresses");
  let htmlForAddressInfo = "";
  Object.keys(contact.address).forEach(function(key) {
    const address = contact.findAddress(key);
    htmlForAddressInfo += "<li id=" + address.addressId + ">" + address.addressType + ": " + address.address + "</li>";
  });
  addressList.html(htmlForAddressInfo);
}

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(contact.emailAddress);
  // $(".address").html(contact.address);
  displayAddressDetails(contact);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
    $("#buttons").on("click", ".deleteButton", function() {
      addressBook.deleteContact(this.id);
      $("#show-contact").hide();
      displayContactDetails(addressBook);
    });
  });
}

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedEmailAddress = $("input#new-email-address").val();
    const inputtedAddress = $("input#new-address").val();
    console.log(inputtedAddress);
    let inputtedAddressType = $("select.address-type option:selected").val();
    console.log(inputtedAddressType);
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-address").val("");
    $("input#new-address").val("");
    $("select#address-type option:selected").val("");

    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailAddress, inputtedAddress, inputtedAddressType);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});