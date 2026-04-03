import { INestApplication } from '@nestjs/common';
import { createApp } from './../src/app.factory';

type ExpressRouteLayer = {
  route?: {
    path?: string;
    methods?: Record<string, boolean>;
  };
};

type ExpressAppWithRouter = {
  router?: {
    stack?: ExpressRouteLayer[];
  };
  _router?: {
    stack?: ExpressRouteLayer[];
  };
};

describe('HealthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await createApp();
    await app.init();
  });

  it('registers the /health GET route', () => {
    const expressApp = app
      .getHttpAdapter()
      .getInstance() as unknown as ExpressAppWithRouter;
    const router = expressApp.router ?? expressApp._router;
    const healthRoute = router?.stack?.find(
      (layer) =>
        layer.route?.path === '/health' && layer.route.methods?.get === true,
    );

    expect(healthRoute).toBeDefined();
  });

  afterEach(async () => {
    await app.close();
  });
});
