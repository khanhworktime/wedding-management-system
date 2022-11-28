function ModalOut(props:any) {
    return(
        <div {...props} className={`fixed inset-0 w-screen h-screen z-[30] ${props?.className}`}></div>
    )
}

export default ModalOut;