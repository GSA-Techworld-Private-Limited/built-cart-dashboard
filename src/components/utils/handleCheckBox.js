export const handleCheckBoxChange = (
  id,
  setCheckedItems,
  setCategorySelect
) => {
  setCheckedItems((prevCheckedItems) => {
    const newCheckedItems = { ...prevCheckedItems };
    // Check if the checkbox was already selected
    const isChecked = newCheckedItems[id];
    // Uncheck all other checkboxes
    Object.keys(newCheckedItems).forEach((key) => {
      if (key !== id) {
        newCheckedItems[key] = false;
      }
    });
    // Toggle the clicked checkbox if it was not checked before
    newCheckedItems[id] = !isChecked;
    return newCheckedItems;
  });
  // Check if the checkbox was already selected, if so, unselect it
  setCategorySelect((prevSelectedCategory) =>
    prevSelectedCategory === id ? null : id
  );
};
