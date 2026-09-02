# Bugs found

Add one section per issue. Bug 1 is filled in to show the format — fix it, then write what you changed. Copy the blank template for the rest.

Keep this file in the repo and **commit it** with your fixes.

---

## Bug 1

**How to reproduce:** Open the app. The expense list says “Newest first”. The first row is Wine (7 Mar). Board game (15 Mar) is further down.

**What is wrong:** The list is showing oldest expenses first. Newest should be at the top.

**What I changed:** I Changed the expense sorting order to display the newest expenses first by sorting dates in descending order.
from this - const sorted = [...expenses].sort((a, b) => dateValue(a.date) - dateValue(b.date));
to this - const sorted = [...expenses].sort((a, b) => dateValue(b.date) - dateValue(a.date));

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
