using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KARacter.YouNeed.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddChatDisableRequired : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChatMessage_ChatThread_ThreadId",
                table: "ChatMessage");

            migrationBuilder.DropForeignKey(
                name: "FK_ChatMessage_Users_SenderId",
                table: "ChatMessage");

            migrationBuilder.DropForeignKey(
                name: "FK_ChatThread_CompanyUsers_ConsultantId",
                table: "ChatThread");

            migrationBuilder.DropForeignKey(
                name: "FK_ChatThread_Users_UserId",
                table: "ChatThread");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ChatThread",
                table: "ChatThread");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ChatMessage",
                table: "ChatMessage");

            migrationBuilder.RenameTable(
                name: "ChatThread",
                newName: "ChatThreads");

            migrationBuilder.RenameTable(
                name: "ChatMessage",
                newName: "ChatMessages");

            migrationBuilder.RenameIndex(
                name: "IX_ChatThread_UserId",
                table: "ChatThreads",
                newName: "IX_ChatThreads_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatThread_Status",
                table: "ChatThreads",
                newName: "IX_ChatThreads_Status");

            migrationBuilder.RenameIndex(
                name: "IX_ChatThread_ConsultantId",
                table: "ChatThreads",
                newName: "IX_ChatThreads_ConsultantId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatMessage_Type",
                table: "ChatMessages",
                newName: "IX_ChatMessages_Type");

            migrationBuilder.RenameIndex(
                name: "IX_ChatMessage_ThreadId",
                table: "ChatMessages",
                newName: "IX_ChatMessages_ThreadId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatMessage_SenderId",
                table: "ChatMessages",
                newName: "IX_ChatMessages_SenderId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatMessage_IsRead",
                table: "ChatMessages",
                newName: "IX_ChatMessages_IsRead");

            migrationBuilder.AlterColumn<Guid>(
                name: "SenderId",
                table: "ChatMessages",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ChatThreads",
                table: "ChatThreads",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ChatMessages",
                table: "ChatMessages",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ChatMessages_ChatThreads_ThreadId",
                table: "ChatMessages",
                column: "ThreadId",
                principalTable: "ChatThreads",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ChatMessages_Users_SenderId",
                table: "ChatMessages",
                column: "SenderId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ChatThreads_CompanyUsers_ConsultantId",
                table: "ChatThreads",
                column: "ConsultantId",
                principalTable: "CompanyUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ChatThreads_Users_UserId",
                table: "ChatThreads",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChatMessages_ChatThreads_ThreadId",
                table: "ChatMessages");

            migrationBuilder.DropForeignKey(
                name: "FK_ChatMessages_Users_SenderId",
                table: "ChatMessages");

            migrationBuilder.DropForeignKey(
                name: "FK_ChatThreads_CompanyUsers_ConsultantId",
                table: "ChatThreads");

            migrationBuilder.DropForeignKey(
                name: "FK_ChatThreads_Users_UserId",
                table: "ChatThreads");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ChatThreads",
                table: "ChatThreads");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ChatMessages",
                table: "ChatMessages");

            migrationBuilder.RenameTable(
                name: "ChatThreads",
                newName: "ChatThread");

            migrationBuilder.RenameTable(
                name: "ChatMessages",
                newName: "ChatMessage");

            migrationBuilder.RenameIndex(
                name: "IX_ChatThreads_UserId",
                table: "ChatThread",
                newName: "IX_ChatThread_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatThreads_Status",
                table: "ChatThread",
                newName: "IX_ChatThread_Status");

            migrationBuilder.RenameIndex(
                name: "IX_ChatThreads_ConsultantId",
                table: "ChatThread",
                newName: "IX_ChatThread_ConsultantId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatMessages_Type",
                table: "ChatMessage",
                newName: "IX_ChatMessage_Type");

            migrationBuilder.RenameIndex(
                name: "IX_ChatMessages_ThreadId",
                table: "ChatMessage",
                newName: "IX_ChatMessage_ThreadId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatMessages_SenderId",
                table: "ChatMessage",
                newName: "IX_ChatMessage_SenderId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatMessages_IsRead",
                table: "ChatMessage",
                newName: "IX_ChatMessage_IsRead");

            migrationBuilder.AlterColumn<Guid>(
                name: "SenderId",
                table: "ChatMessage",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ChatThread",
                table: "ChatThread",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ChatMessage",
                table: "ChatMessage",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ChatMessage_ChatThread_ThreadId",
                table: "ChatMessage",
                column: "ThreadId",
                principalTable: "ChatThread",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ChatMessage_Users_SenderId",
                table: "ChatMessage",
                column: "SenderId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ChatThread_CompanyUsers_ConsultantId",
                table: "ChatThread",
                column: "ConsultantId",
                principalTable: "CompanyUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ChatThread_Users_UserId",
                table: "ChatThread",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
