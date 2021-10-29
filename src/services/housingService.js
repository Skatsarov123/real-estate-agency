const Housing = require('../models/housing');

exports.getAll = () => Housing.find().lean();

exports.create = (housingData) => Housing.create(housingData);

exports.getTopHouses = () => Housing.find().sort({ createdAt: -1 }).limit(3).lean();

exports.getOne = (housingId) => Housing.findById(housingId).populate('tenants');

exports.addTenant = (housingId, tenantId) =>
    // let housing = await housingService.getOne(req.params.housingId);
    // housing.tenants.push(req.user._id)
    // return housing.save();

    Housing.findOneAndUpdate(
        { _id: housingId },
        {
            $push: { tenants: tenantId },
            $inc: { availablePieces: -1 }
        },
        { runValidators: true }
    );

exports.delete = (housingId) => Housing.findByIdAndDelete(housingId);

exports.updateOne = (housingId, housingData) => Housing.findByIdAndUpdate(housingId, housingData);

exports.search = (text) => Housing.find({ type: { $regex: `${text}` , $options: 'i'}}).lean();

