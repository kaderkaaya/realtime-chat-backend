import helmet from "helmet";


async function applySecurity(app: any) {
    app.use(helmet());
}
export default applySecurity;