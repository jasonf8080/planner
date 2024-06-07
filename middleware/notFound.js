const notFoundMiddleware = (req, res) => {
    console.log('fuck not found')
    res.status(404).send('Sorry route does not exist')
}

export default notFoundMiddleware