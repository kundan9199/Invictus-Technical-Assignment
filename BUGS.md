# Bugs found

Add one section per issue. Bug 1 is filled in to show the format — fix it, then write what you changed. Copy the blank template for the rest.

Keep this file in the repo and **commit it** with your fixes.

---

## Bug 1

**How to reproduce:** Open the app. The expense list says “Newest first”. The first row is Wine (7 Mar). Board game (15 Mar) is further down.

**What is wrong:** The list is showing oldest expenses first. Newest should be at the top.

**What I changed:** I Changed the expense sorting order to display the newest expenses first by sorting dates in descending order.
1. From this - const sorted = [...expenses].sort((a, b) => dateValue(a.date) - dateValue(b.date));
2. To this - const sorted = [...expenses].sort((a, b) => dateValue(b.date) - dateValue(a.date));

---

## Bug 2

**How to reproduce:**  
1. Open the app with the seeded data.  
2. Apply a filter such as Food, or sort the list by newest first.  
3. Click Delete or edit the amount on a visible expense row that is not the first item in the original state array.  
4. Notice the app removes or edits a different expense than the one you clicked.

**What is wrong:**  
The app is deleting and updating expenses by the visible list index instead of the expense’s stable ID. When the list is filtered or sorted, the visible row order no longer matches the original `state.expenses` array order, so the wrong item is modified.

**What I changed:**  
I changed the expense actions to target each item by `expense.id` instead of a filtered/sorted array index. The reducer now deletes and updates by matching the ID, and the list uses the expense ID as the React key so the correct row stays tied to the correct data.

---

## Bug 3

**How to reproduce:**  
1. Open the app and inspect the seeded expenses.  
2. Use the Paid by filter and choose any member, such as Aisha Khan.  
3. The list still shows expenses paid by other people, or it appears to ignore the selected payer entirely.

**What is wrong:**  
The Paid by filter is comparing a numeric member ID from each expense to a string value coming from the select element. Since `e.paidBy` is a number and `paidBy` is a string, the comparison always fails when a payer is selected, so the filter never works as intended.

**What I changed:**  
I normalized the selected value to a number before comparing it to each expense’s `paidBy` field. This keeps the filter logic consistent with the actual member IDs stored in the app and makes the payer filter match the correct expenses.

---

## Bug 5

**How to reproduce:**  
1. Create a new expense for $100.  
2. Set the split to equal between three people.  
3. Save the expense and inspect the per-person shares or the resulting balances.  
4. The shares do not total the original amount; they are $33.33 + $33.33 + $33.33 = $99.99.

**What is wrong:**  
The equal-split logic rounds each share independently to two decimals, so the total is short by a cent every time the amount is not divisible evenly by the number of people. This violates the app’s rule that the group should not “lose” or “invent” money in rounding.

**What I changed:**  
I changed the equal-split calculation to allocate the total bill in cents and distribute any leftover cent across the first participants, so the sum of the shares exactly matches the original amount while keeping the shares as even as possible.

---

## Bug 6

**How to reproduce:**  
1. Open the app with the seeded data.  
2. Look at the Balances panel.  
3. Find a member who has paid more than their share, such as Diya Patel on the Uber to airport bill.  
4. The panel says they "owes" money even though they should be in credit.

**What is wrong:**  
The balance labels are reversed. Positive balances are treated as debtors and negative balances as creditors, but the app’s own data model defines positive balances as money that is owed to the member and negative balances as money the member owes. The UI therefore tells the user the opposite of the actual status.

**What I changed:**  
I swapped the positive and negative balance conditions in the panel so that a positive balance displays as "is owed" and a negative balance displays as "owes". This matches the actual calculation and the balance semantics used elsewhere in the app.

---

## Bug 7

**How to reproduce:**  
1. Open the app and add or edit an expense.  
2. Refresh the page or reopen the app after the data has been saved in browser storage.  
3. The expense list still appears, but the date sorting and date formatting no longer behave correctly for the saved expenses.

**What is wrong:**  
The app saves `Date` objects into local storage by serializing them to strings, but when it reloads the state it returns the raw JSON without converting those stored date strings back into `Date` objects. The code later treats those strings as if they were real dates, so date comparisons and display logic can break after a reload.

**What I changed:**  
I changed the state loader to normalize saved expense dates back into `Date` objects before returning the state. This keeps the persisted data consistent with the rest of the app and restores correct sorting and display behavior after reloads.

---

## Bug 8

**How to reproduce:**  
1. Open the app and add a new member from the Summary card.  
2. Immediately go to the Add expense form and create a new expense.  
3. The new member is present in the payer dropdown, but they are not included in the default split selection and their percentage row is missing from the custom split UI unless you manually reselect them.

**What is wrong:**  
The add-expense form keeps stale split state after the members list changes. When a new member is added, the form does not resync its selected participants or percentage values to the current members list, so the newly added person is excluded from the expense split even though they are now part of the group.

**What I changed:**  
I added a synchronization effect so the form validates and updates the payer and split selections whenever the member list changes. This keeps the form’s chosen participants aligned with the current app state and ensures new members are included in the default split.

---
