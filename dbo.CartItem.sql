CREATE TABLE [dbo].[CartItem] (
    [Id]        INT IDENTITY (1, 1) NOT NULL,
    [Quantity]  INT NOT NULL,
    [ProductId] INT NOT NULL,
    [CartId]    INT NULL,
    CONSTRAINT [PK_CartItem] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_CartItem_Carts_CartId] FOREIGN KEY ([CartId]) REFERENCES [dbo].[Carts] ([Id]),
    CONSTRAINT [FK_CartItem_Products_ProductId] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Products] ([Id]) ON DELETE CASCADE
);


GO
CREATE NONCLUSTERED INDEX [IX_CartItem_CartId]
    ON [dbo].[CartItem]([CartId] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_CartItem_ProductId]
    ON [dbo].[CartItem]([ProductId] ASC);

