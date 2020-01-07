export const slideLeftSidebar = (event) => {
    const { target } = event;
    const leftSidebar = document.querySelector('.aside.left');

    target.classList.contains('close') ? (
        leftSidebar.classList.remove('show')
    ) : (
        leftSidebar.classList.add('show')
    );
    console.log(leftSidebar.classList);
    console.log(target);
}

export const slideRightSidebar = (event) => {
    const { target } = event;
    const rightSidebar = document.querySelector('.aside.right');

    target.classList.contains('close') ? (
        rightSidebar.classList.remove('show')
    ) : (
        rightSidebar.classList.add('show')
    );
    console.log(rightSidebar.classList);
    console.log(target);
}