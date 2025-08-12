#!/usr/bin/env python3
"""
Setup script для Background Remover CLI
"""

from setuptools import setup, find_packages
import os

# Читаем README файл
def read_readme():
    readme_path = os.path.join(os.path.dirname(__file__), 'README.md')
    if os.path.exists(readme_path):
        with open(readme_path, 'r', encoding='utf-8') as f:
            return f.read()
    return "CLI инструмент для удаления фона с изображений"

# Читаем requirements
def read_requirements():
    requirements_path = os.path.join(os.path.dirname(__file__), 'requirements.txt')
    if os.path.exists(requirements_path):
        with open(requirements_path, 'r', encoding='utf-8') as f:
            return [line.strip() for line in f if line.strip() and not line.startswith('#')]
    return []

setup(
    name="background-remover-cli",
    version="1.0.0",
    description="CLI инструмент для удаления фона с изображений с использованием AI",
    long_description=read_readme(),
    long_description_content_type="text/markdown",
    author="Background Remover CLI",
    author_email="",
    url="",
    packages=find_packages(),
    py_modules=["background_remover"],
    install_requires=read_requirements(),
    entry_points={
        'console_scripts': [
            'bg-remove=background_remover:main',
            'background-remover=background_remover:main',
        ],
    },
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Developers",
        "Intended Audience :: End Users/Desktop",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Topic :: Multimedia :: Graphics :: Graphics Conversion",
        "Topic :: Scientific/Engineering :: Image Processing",
    ],
    python_requires=">=3.7",
    keywords="background removal, image processing, AI, CLI, rembg",
    project_urls={
        "Bug Reports": "",
        "Source": "",
        "Documentation": "",
    },
)
