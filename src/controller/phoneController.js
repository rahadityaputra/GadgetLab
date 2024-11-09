
export const getTopPhone = async (req, res) => {
    try {
        const topPhones = await gsmarena.top.get();
        console.log(topPhones);
    } catch (error) {
        res.status(400).json({message : "error"});
    }
}


