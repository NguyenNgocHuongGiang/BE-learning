"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.useGlobalPipes(new common_1.ValidationPipe());
    const configSwagger = new swagger_1.DocumentBuilder()
        .setTitle('Youtube_mini')
        .setVersion("1.0")
        .addBearerAuth()
        .build();
    const swagger = swagger_1.SwaggerModule.createDocument(app, configSwagger);
    swagger_1.SwaggerModule.setup("swagger", app, swagger);
    const port = configService.get('PORT') || 8080;
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map