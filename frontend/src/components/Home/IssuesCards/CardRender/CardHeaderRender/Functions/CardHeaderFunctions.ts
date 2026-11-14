// Closes the menu from the post
function handleClose(
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
): void {
    setAnchorEl(null);
}

// Sets the postId state variable to the post id we clicked on the vertical menu
function handleMenu(
    e: React.MouseEvent<HTMLElement>,
    id: number,
    setPostId: React.Dispatch<React.SetStateAction<number | null>>,
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>,
) {
    setPostId(id);
    setAnchorEl(e.currentTarget);
}

// Makes the post date render in a readable format
function handleDate(data: string): string {
    const date: Date = new Date(data);
    const displayDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return displayDate;
}

export { handleClose, handleMenu, handleDate};