# Bugs found

Add one section per issue. Bug 1 is filled in to show the format — fix it, then write what you changed. Copy the blank template for the rest.

Keep this file in the repo and **commit it** with your fixes.

---

## Bug 1

**How to reproduce:** Open the app. The expense list says “Newest first”. The first row is Wine (7 Mar). Board game (15 Mar) is further down.

**What is wrong:** The list is showing oldest expenses first. Newest should be at the top.

**What I changed:** Changed the expense sorting order to display the newest expenses first by sorting dates in descending order.
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
