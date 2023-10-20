function breedDetail(raza) {


    const detalleRaza = {
        id: raza.id,
        image: raza.image.url,
        name: raza.name,
        height: raza.height,
        weight: raza.weight,
        lifespan: raza.life_span,

    };

    return detalleRaza;
}

module.exports = {
    breedDetail,
};