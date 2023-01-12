const Footer = () => {
    const footerYear = new Date().getFullYear()
    return ( 
        <footer className="p-5 bg-base-300
        text-primary-content text-center text-sm">
            <p>Copyright &copy; {footerYear} All rights reserved</p>
        </footer>
     );
}
 
export default Footer;