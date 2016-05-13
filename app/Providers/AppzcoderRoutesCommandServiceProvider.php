<?php namespace App\Providers;
use Illuminate\Support\ServiceProvider;
use App\Console\Commands\AppzcoderRoutesCommand;
class AppzcoderRoutesCommandServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('command.routes.list', function()
        {
            return new AppzcoderRoutesCommand;
        });
        $this->commands(
            'command.routes.list'
        );
    }
}