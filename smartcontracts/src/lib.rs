use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    metadata::{create_metadata_accounts_v3, CreateMetadataAccountsV3, Metadata},
    token::{burn, mint_to, transfer, Burn, Mint, MintTo, Token, TokenAccount, Transfer},
};
use mpl_token_metadata::types::DataV2;
use solana_program::{pubkey, pubkey::Pubkey};

declare_id!("EWF5buzh3LJRrVoUa7cu21jwewuPThtYbdrJ2Tq5sU9d");

pub const PREFIX: &str = "metadata";

fn find_metadata_account(mint: &Pubkey) -> (Pubkey, u8) {
    Pubkey::find_program_address(
        &[
            PREFIX.as_bytes(),
            mpl_token_metadata::ID.as_ref(),
            mint.as_ref(),
        ],
        &mpl_token_metadata::ID,
    )
}

// Trading crypto rates at 1000x leverage would be fun :)
#[program]
mod everything_fun {
    use super::*;

    pub fn create_mint(
        ctx: Context<CreateMint>,
        uri: String,
        name: String,
        symbol: String,
    ) -> Result<()> {
        let seeds = b"ethenasol";
        let bump = ctx.bumps.token_mint;
        let signer: &[&[&[u8]]] = &[&[seeds, &[bump]]];

        let data_v2 = DataV2 {
            name: name,
            symbol: symbol,
            uri: uri,
            seller_fee_basis_points: 0,
            creators: None,
            collection: None,
            uses: None,
        };

        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_metadata_program.to_account_info(),
            CreateMetadataAccountsV3 {
                metadata: ctx.accounts.metadata_account.to_account_info(),
                mint: ctx.accounts.token_mint.to_account_info(),
                mint_authority: ctx.accounts.token_mint.to_account_info(),
                update_authority: ctx.accounts.token_mint.to_account_info(),
                payer: ctx.accounts.user.to_account_info(),
                system_program: ctx.accounts.system_program.to_account_info(),
                rent: ctx.accounts.rent.to_account_info(),
            },
            signer,
        );

        create_metadata_accounts_v3(cpi_ctx, data_v2, true, true, None)?;

        Ok(())
    }

    // Simple buy token swap for Ethena event. At the moment is just a SOL swap but you get the idea.
    pub fn buy_fut(ctx: Context<BuyFut>) -> Result<()> {
        let seeds = b"ethenasol";
        let bump = ctx.bumps.token_mint;
        let signer: &[&[&[u8]]] = &[&[seeds, &[bump]]];

        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            MintTo {
                mint: ctx.accounts.token_mint.to_account_info(),
                to: ctx.accounts.user_token_account.to_account_info(),
                authority: ctx.accounts.token_mint.to_account_info(),
            },
            signer,
        );

        let amount = (1u64)
            .checked_mul(10u64.pow(ctx.accounts.token_mint.decimals as u32))
            .unwrap();

        mint_to(cpi_ctx, amount)?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateMint<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        init,
        seeds = [b"ethenasol"],
        bump,
        payer = user,
        mint::decimals = 9,
        mint::authority = token_mint,
    )]
    pub token_mint: Account<'info, Mint>,

    #[account(
        mut,
        address=find_metadata_account(&token_mint.key()).0
    )]
    pub metadata_account: UncheckedAccount<'info>,

    pub token_program: Program<'info, Token>,
    pub token_metadata_program: Program<'info, Metadata>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct BuyFut<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        init_if_needed,
        payer = user,
        associated_token::mint = token_mint,
        associated_token::authority = user
    )]
    pub user_token_account: Account<'info, TokenAccount>,

    #[account(
        mut,
        seeds = [b"ethenasol"],
        bump,
    )]
    pub token_mint: Account<'info, Mint>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}
