import { PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { DDB } from 'src/database/database.module';
import { ThumbnailsRepository } from './thumbnails.repository';

describe('ThumbnailsRepository', () => {
  let repository: ThumbnailsRepository;
  const ddb = {
    send: jest.fn(),
  };
  const configService = {
    getOrThrow: jest.fn(),
  };

  beforeEach(async () => {
    jest.useFakeTimers().setSystemTime(new Date('2026-04-12T10:00:00.000Z'));
    ddb.send.mockReset();
    configService.getOrThrow.mockReset();
    configService.getOrThrow.mockReturnValue('thumbnails-test');

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ThumbnailsRepository,
        {
          provide: ConfigService,
          useValue: configService,
        },
        {
          provide: DDB,
          useValue: ddb,
        },
      ],
    }).compile();

    repository = module.get(ThumbnailsRepository);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('creates a thumbnail with default private visibility', async () => {
    ddb.send.mockResolvedValue({});

    const result = await repository.createThumbnail({
      id: 'thumbnail-1',
      userId: 'user-1',
      title: 'Top smartwatch',
      prompt: 'make it bold',
      promptUsed: 'prompt used',
      style: 'bold_and_graphic',
      aspectRatio: '16:9',
      colorScheme: 'vibrant',
      provider: 'vertex',
      model: 'gemini-2.5-flash-image',
      imageUrl: 'https://cdn.example.com/generated-images/thumb.png',
    });

    expect(ddb.send).toHaveBeenCalledWith(expect.any(PutCommand));
    const [putCommand] = ddb.send.mock.calls[0] as [PutCommand];

    expect(putCommand.input).toEqual({
      TableName: 'thumbnails-test',
      Item: {
        id: 'thumbnail-1',
        userId: 'user-1',
        title: 'Top smartwatch',
        prompt: 'make it bold',
        promptUsed: 'prompt used',
        style: 'bold_and_graphic',
        aspectRatio: '16:9',
        colorScheme: 'vibrant',
        provider: 'vertex',
        model: 'gemini-2.5-flash-image',
        imageUrl: 'https://cdn.example.com/generated-images/thumb.png',
        visibility: 'private',
        createdAt: '2026-04-12T10:00:00.000Z',
      },
    });
    expect(result).toEqual({
      id: 'thumbnail-1',
      userId: 'user-1',
      title: 'Top smartwatch',
      prompt: 'make it bold',
      promptUsed: 'prompt used',
      style: 'bold_and_graphic',
      aspectRatio: '16:9',
      colorScheme: 'vibrant',
      provider: 'vertex',
      model: 'gemini-2.5-flash-image',
      imageUrl: 'https://cdn.example.com/generated-images/thumb.png',
      visibility: 'private',
      createdAt: '2026-04-12T10:00:00.000Z',
    });
  });

  it('updates thumbnail visibility and returns the updated attributes', async () => {
    ddb.send.mockResolvedValue({
      Attributes: {
        id: 'thumbnail-1',
        userId: 'user-1',
        visibility: 'public',
        updatedAt: '2026-04-12T10:00:00.000Z',
      },
    });

    const result = await repository.updateThumbnail({
      id: 'thumbnail-1',
      userId: 'user-1',
      visibility: 'public',
    });

    expect(ddb.send).toHaveBeenCalledWith(expect.any(UpdateCommand));
    const [updateCommand] = ddb.send.mock.calls[0] as [UpdateCommand];

    expect(updateCommand.input).toEqual({
      TableName: 'thumbnails-test',
      Key: { id: 'thumbnail-1' },
      UpdateExpression: 'SET visibility = :visibility, updatedAt = :updatedAt',
      ExpressionAttributeValues: {
        ':visibility': 'public',
        ':updatedAt': '2026-04-12T10:00:00.000Z',
        ':userId': 'user-1',
      },
      ConditionExpression: 'attribute_exists(id) AND userId = :userId',
      ReturnValues: 'ALL_NEW',
    });
    expect(result).toEqual({
      id: 'thumbnail-1',
      userId: 'user-1',
      visibility: 'public',
      updatedAt: '2026-04-12T10:00:00.000Z',
    });
  });
});
