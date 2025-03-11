from django.contrib.auth import login
from django.shortcuts import redirect, render
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView
from django.urls import reverse
from users.forms import SignUpForm

#注册
def register(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('home')
    else:
        form = SignUpForm()
    return render(request, 'registration/register.html', {'form': form})

#用户个人页面
class ProfileView(LoginRequiredMixin, TemplateView):
    template_name = 'users/profile.html'

    #将用户信息用在模板中
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['user'] = self.request.user
        return context

#头像跳转逻辑
def profile_redirect(request):
    if request.user.is_authenticated:
        return redirect('profile')
    return redirect('login')