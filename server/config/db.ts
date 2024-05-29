import mongoose from 'mongoose';

const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI as string, {});
        console.log('mongoDB connected...');
    } catch (err) {
        console.log(`MongoDB connection error}`);
        process.exit(-1);
    }
};

export {connectDB};
